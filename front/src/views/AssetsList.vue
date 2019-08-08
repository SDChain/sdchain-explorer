<template>
  <div class="main">
    <Breadcrumb class="breadcrumb" separator=">">
      <BreadcrumbItem to="/">{{$t('wallet.home')}}</BreadcrumbItem>
      <BreadcrumbItem to="">{{$t('wallet.wallet_address')}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="accountinfo">
      <div class="address">
        {{$t('wallet.wallet_address')}}：<span style="cursor:pointer" @click="back">{{addr}}</span>
        <Tooltip :content="$t('wallet.tipcopy')" placement="top">
          <i
            class="iconfont icon-fuzhi"
            v-clipboard:copy="addr"
            v-clipboard:success="copysuc"
            v-clipboard:error="copyerr"
          ></i>
        </Tooltip>
      </div>
    </div>
    <div class="accountlist">
      <h4 class="h4">{{ $t('wallet.passport')}}</h4>
      <Table
        :columns="thead"
        :data="data"
        size="small"
        :no-data-text="$t('nodata')"
        :loading="loading"
      ></Table>
    </div>
    <div class="more" v-if="ismore">
      <Button type="primary" ghost @click="loadMore" :loading="more">{{$t('wallet.loadmore')}}</Button>
    </div>
  </div>
</template>

<script>
import {
  Table,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
} from "iview";
import api from "../common/api";
import BigNumber from 'bignumber.js'

export default {
  name: "Account",
  components: {
    Table,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Tooltip,
  },
  data() {
    return {
      loading: false,
      more: false,
      limit: 10,
      ismore: false,
      qr: false,
      addr: this.$route.query.address,
      thead: [
        {
          title: this.$t('wallet.token'),
          key: "issuer",
          align: "left",
          render: (h, params) => {
              return h('div', [
                  h('div', {
                      style: {
                        float:'left',
                        width: '40px',
                        color: '#4da1ff',
                      }
                  }, params.row.currency),
                  h('div', {
                      style: {
                          float:'left',
                          'padding-left': '80px'
                      }
                  }, `${this.$t('wallet.from')}：${params.row.issuer}`)
              ])
          }
        },
        {
          title: this.$t('wallet.quantity'),
          key: "num",
          align: "center",
           render: (h, params) => {
              return h('span',{
                style: {
                        color: '#0b0b0b',
                      }
              },params.row.num)
           }
        }
      ],
      data: []
    };
  },
  created() {
    this.loading = true 
    this.balances()
  },
  watch: {
    "$route.query.address"() {
      this.data = [];
      this.balances();
    }
  },
  methods: {
    copysuc(e) {
      this.$Message.success(this.$t("copysuc"));
    },
    copyerr(e) {
      this.$Message.error(this.$t("copyerr"));
    },
    balances() {
      this.data = []
      this.$axios(`${api.balances}/${this.$route.query.address}?limit=${this.limit}`)
        .then(res => {
          let balances = res.data.balances;
          for (let i = 1; i < balances.length; i++) {
              this.data.push({
                  issuer: balances[i].counterparty,
                  currency: balances[i].currency,
                  num: new BigNumber(balances[i].value).toFormat(),
              })
          }
          this.ismore = res.data.marker ? true : false
          this.loading = false
          this.more = false
        })
        .catch(err => {
            console.log(err)
        });
    },
    
    loadMore() {
      this.more = true
      this.limit = this.limit + 10;
      this.balances();
    },

    back() {
      this.$router.push({
        path: '/account',
        query: {
          address: this.addr
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/var.less";

.accountinfo {
  .box();
  padding: 10px 20px;
  margin-bottom: 20px;
  overflow: hidden;
  .iconfont {
    font-size: 20px;
    cursor: pointer;
    color: @sdc-mainColor1;
    padding: 5px;
    &:hover {
      background: @mainbg;
      border-radius: 50%;
    }
  }
  .balance {
    li {
      float: left;
      width: 45%;
      list-style: none;
      line-height: 30px;
      border-bottom: 1px solid #dddcdc;
      .val {
        float: right;
        padding-right: 30px;
      }
      &.assets {
        float: left;
        width: 45%;
        margin-left: 10%;
        .uni {
          color: @sdc-mainColor1;
        }
        a {
          float: right;
          color: #7c7c7c;
        }
      }
    }
  }
  .address {
    border-bottom: 1px solid #dddcdc;
    margin-bottom: 8px;
    padding-bottom: 8px;
    color: @sdc-txtColor3;
  }
  .rinfo,
  .linfo {
    list-style: none;
    display: inline-block;
    width: 50%;
  }
  .rinfo {
    text-align: right;
    .select {
      text-align: left;
      margin-left: 20px;
    }
  }
}
.accountlist {
  .box();
  .h4 {
    color: @sdc-txtColor3;
    padding: 10px 20px;
  }
}
.more {
  text-align: center;
  padding: 30px 0;
}
</style>
