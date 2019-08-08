<template>
  <div class="search">
    <div v-if="type == 'head'">
      <Input
        style="border: 0px !important;"
        v-model="key"
        search
        size="default"
        @on-search="handleSearch"
        @on-focus="isfocus = true"
        @on-blur="isfocus = false"
        :placeholder="$t('search')"
        class="hinput"
        :style="isfocus? 'width:250px;border:none;': ''"
      />
    </div>
    <div v-else>
      <Input
        v-model="key"
        size="large"
        @on-search="handleSearch"
        search
        enter-button
        :placeholder="$t('search')"
      />
    </div>
  </div>
</template>

<script>
import { Input } from "iview";
import api from '../common/api'
export default {
  name: "Search",
  props: ["type"],
  components: {
    Input
  },
  data() {
    return {
      isfocus: false,
      key: ""
    };
  },
  methods: {
    handleSearch() {
      if (this.key) {
        const kw = this.key
        if (kw.length <= 15) {
          let reg = /^[0-9]*$/;
          if (reg.test(kw)) {
            this.$axios(`${api.ledgers}/${kw}`).then(res => {
              this.$router.push(`/block/detail?block=${kw}`)
            }).catch(err => {
              this.$router.push('/err?err=block')
            })
          } else {
            const KW = kw.toLocaleUpperCase()
            this.$axios({
              url: api.secondCurrencyDetail,
              method: 'get',
              params: {
                currency: KW
              }
            }).then(res => {
              let code = res.data.data.code
              if (code == 'E00001') {
                this.$router.push('/err?err=account')
              } else {
                this.$router.push(`/assets/detail?currency=${KW}`)
              }
            }).catch(err => {
              this.$router.push('/err?err=account')
            })
          }
        }
        if (kw.length > 15 && kw.length <= 40) {
          this.$axios(`${api.balances}/${kw}`).then(res => {
            this.$router.push(`/account?address=${kw}`);
          }).catch(err => {
            this.$router.push('/err?err=account')
          })
        }
        if (kw.length > 40) {
          this.$axios(`${api.transactions}/${kw}`).then(res => {
            this.$router.push(`/hash?hash=${kw}`);
          }).catch(err => {
            this.$router.push('/err?err=hash')
          })
        }

        this.key = ''
      } else {
        //输入框拉长时，如无内容，提示无输入内容
        if(this.isfocus===false){
          this.$Message.warning(this.$t("searcherr"));
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  background: none !important;
  display: inline-block;
  .hinput {
    width: 186px;
    transition: all 500ms;
  }
  .ivu-input-search-icon {
    background: none !important;
    color: #51a1ff !important;
  }
  .ivu-input:hover {
    border-color: #A2C2F7 !important;
  }
  .ivu-input {
    border: 0px !important;
    font-size: 10px;
  }
}
</style>
