<template>
  <div class="main">
      <div class="contentwrap">

    <div class="blocklist">
      <h1>{{$t('assets.tit')}}</h1>
      <Table
        :columns="thead"
        :data="data"
        size="default"
        :loading="loading"
        :no-data-text="$t('nodata')"
      ></Table>
    </div>
    <div class="more" v-if="ismore">
      <Button :loading="more" @click="loadMore" type="primary" ghost>{{$t('assets.more')}}</Button>
    </div>
    </div>
  </div>
</template>

<script>
import {
  Table,
  Button,
} from "iview";
import api from "../common/api";
import BigNumber from 'bignumber.js'

export default {
  name: "assets",
  components: {
    Table,
    Button,
  },
  data() {
    return {
      loading: false,
      more: false,
      limit: 20,
      curpage: 1,
      ismore: false,
      thead: [
        {
          title: this.$t("assets.number"),
          key: "num",
          align: "left",
          width: 50,
        },
        {
          title: this.$t("assets.tit2"),
          key: "name",
          render:(h, params) => {
              return h('div',{
                  style: {
                      cursor: 'pointer',
                      width: '100%',
                      height: '80px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:`/assets/detail`, query: { currency: params.row.name}})
                    }
                  }
              }, [
                  h('div', {
                    style: {
                      width: '62px',
                      height: '62px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      float: 'left',
                      marginTop: '10px',
                      border: '1px solid #ddd',
                    }
                  },[
                    h('img',{
                      attrs: {
                          src: params.row.pic
                      },
                      style: {
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '60px',
                        maxHeight: '60px',
                      },
                     }),
                  ]),

                  h('div', {
                      style: {
                          'padding-left': '70px',
                          'padding-top': '10px'
                      }
                  }, [
                      h('h5', params.row.name),
                      h('p', {
                          style: {
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis',
                            'display': '-webkit-box',
                            '-webkit-box-orient': 'vertical',
                            '-webkit-line-clamp': 2 ,
                          },
                      }, params.row.description)
                  ]),

              ])
          },
          align: "left",
          width:430
        },
        {
          title: this.$t("assets.tit3"),
          key: "addr",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#4da1ff",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$router.push({path:'/account', query: { address: params.row.addr}})
                  }
                }
              },
              params.row.addr
            );
          },
          align: "center",
          width: 400
        },
        {
          title: this.$t("assets.tit4"),
          key: "totalCount", //发行总量
          align: "right",
        }
      ],
      data: []
    };
  },

  created() {
    this.loading = true
    this.secondCurrencyList();
  },

  methods: {
    //二级通证列表
    secondCurrencyList() {
      this.$axios({
        url: api.secondCurrencyList,
        params: {
          page: this.curpage,
          rows: this.limit
        }
      })
        .then(res => {
          let list = res.data.data.currencyList;
          list.forEach((val, index) => {
            this.data.push({
              num: (this.curpage - 1) * this.limit + index + 1,
              name: val.currency,
              pic: val.pic,
              description: val.description,
              addr: val.counterparty,
              totalCount: new BigNumber(val.limit).toFormat()
            });
          });
          this.ismore = res.data.data.all < this.limit ? false : true;
          if (res.data.data.currencyList.length === 0) {
            this.$Message.info(this.$t('assets.nomore'));
          }
          this.loading = false
          this.more = false
        })
        .catch(err => {
          console.log(err);
        });
    },

    //加载更多
    loadMore() {
      this.curpage++
      this.more = true
      this.secondCurrencyList()
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/var.less";
.more {
  text-align: center;
  padding: 30px 0;
}
.blocklist{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    padding: 0 15px;
    background-color: #fff;
    h1{
      padding-top:10px;
    }
}

</style>
