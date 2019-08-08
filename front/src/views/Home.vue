<template>
  <div class="home">
    <div class="main">
      <div class="block">
        <div class="titlebar">
          <span style="text-align:left;">
            <i class="iconfont icon-4"></i>
            {{nowtime}}
          </span>
        </div>
        <div class="card" >
          <table class="no" @click="$router.push('/history/')">
            <tr>
              <td>
                <div class="iborder">
                  <i class="iconfont icon-Ring-Chart"></i>
                </div>
              </td>
              <td>
                <p>
                  <span>{{$t('home.amount')}}</span>
                </p>
                <p>{{totalVal}}</p>
              </td>
            </tr>
          </table>
          <table class="no" @click="$router.push('/assets/')">
            <tr>
              <td>
                <div class="iborder">
                  <i class="iconfont icon-Diagram-"></i>
                </div>
              </td>
              <td>
                <p>
                  <span>{{$t('home.assetsTotal')}}</span>
                </p>
                <p>{{passVal}}</p>
              </td>
            </tr>
          </table>
          <table class="no" @click="directLatestBlock">
            <tr>
              <td>
                <div class="iborder">
                  <i class="iconfont icon-Block-Chart"></i>
                </div>
              </td>
              <td>
                <p>
                  <span>{{$t('home.height')}}</span>
                </p>
                <p>{{heightVal}}</p>
              </td>
            </tr>
          </table>
          <table class="no" @click="directLatestBlock">
            <tr>
              <td>
                <div class="iborder">
                  <i class="iconfont icon-jiaoyijilu"></i>
                </div>
              </td>
              <td>
                <p>
                  <span>{{$t('home.newtrading')}}</span>
                </p>
                <p>{{tradeVal}}</p>
              </td>
            </tr>
          </table>
        </div>
        <div class="lineChart">
          <div class="titlebar">
            <div class="h3 totalcount" style="width:100%;">
              {{$t('home.trading_amount')}}
              <span class="right"><span class="point"></span> {{$t('home.trading')}}</span>
            </div>
            <Chart/>
          </div>
        </div>
      </div>

      <div class="blocklist">
        <div class="titlebar">
          <div class="h3">{{$t('home.blocklist')}}</div>
        </div>
        <div class="table">
          <Table
            stripe
            :columns="thead1"
            :data="data1"
            size="small"
            :no-data-text="$t('nodata')"
            :loading="loading"
          ></Table>
        </div>
      </div>

      <div class="tradinglist">
        <div class="titlebar">
          <div class="h3">{{$t('home.tradinglist')}}</div>
        </div>
        <div class="table">
          <Table stripe :columns="thead2" :data="data2" size="small" :no-data-text="$t('nodata')"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo";
import Head from "../components/Head";
import Foot from "../components/Foot";
import Chart from "../components/Chart";
import dayjs from "dayjs";
import Search from "../components/Search";
import api from "../common/api";
import { Table } from "iview";
import BigNumber from 'bignumber.js'
const formatday = "YYYY-MM-DD HH:mm:ss";
export default {
  name: "home",
  components: {
    Head,
    Foot,
    Logo,
    Search,
    Table,
    Chart
  },
  data() {
    return {
      loading: false,
      nowtime: null,
      totalVal: 0,
      passVal: 0,
      heightVal: 0,
      tradeVal: 0,
      timer: null,
      thead1: [
        {
          title: this.$t("home.head1")[0],
          key: "height",
          width: 150,
          render: (h, param) => {
            return h(
              "router-link",
              {
                style: "color:#4ea1fd",
                props: {
                  to: "/block/detail?block=" + param.row.height
                }
              },
              param.row.height
            );
          }
        },
        {
          title: this.$t("home.head1")[1],
          key: "hash",
          width: 550,
          ellipsis: true
        },
        {
          title: this.$t("home.head1")[2],
          key: "count",
          align: "center"
        },
        {
          title: this.$t("home.head1")[3],
          key: "time",
          align: "right"
        }
      ],
      thead2: [
        {
          title: this.$t("home.head2")[0],
          key: "hash",
          width: 500,
          render: (h, param) => {
            return h(
              "router-link",
              {
                style: "color:#4ea1fd",
                props: {
                  to: "/hash?hash=" + param.row.hash
                }
              },
              param.row.hash
            );
          }
        },
        {
          title: this.$t("home.head2")[1],
          key: "type",
          align: "center"
        },
        {
          title: this.$t("home.head2")[2],
          key: "count",
          align: "center"
        },
        {
          title: this.$t("home.head2")[3],
          key: "time",
          align: "right"
        }
      ],
      data1: [],
      data2: []
    };
  },
  created() {
    this.transactionsTotal();
    this.passTotal();
    this.ledgers();
    this.transactions();
  },
  mounted() {
    this.loop(10);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    transactionsTotal() {
      this.$axios({
        url: api.transactionsTotal
      }).then(res => {
        this.totalVal =
            res.data.count > 1000000 ? (res.data.count / 1000000).toFixed(2) + "M" : new BigNumber(res.data.count).toFormat();
      }).catch(err => {
        console.log(err)
      });
    },
    passTotal() {
      this.$axios({
        url: api.secondCurrencyList
      }).then(res => {
        this.passVal = res.data.data.all
      }).catch(err => {
        console.log(err)
      });
    },
    transactions(reload) {
      this.$axios({
        url: api.transactions
      }).then(res => {
        if (reload) {
          this.data2 = [];
        }
        res.data.transactons.map(data => {
          this.data2.push({
            hash: data.hash,
            type: data.type == "Payment" ? this.$t("Payment") :
                  data.type == "OfferCreate" ? this.$t("OfferCreate") :
                  data.type == "OfferCancel" ? this.$t("OfferCancel") :
                  data.type == "AccountSet" ? this.$t("AccountSet") :
                  data.type == "TrustSet" ? this.$t("TrustSet") :
                  this.$t("other"),
            count: data.amount ? data.amount : '--',
            time: dayjs(data.time).format(formatday)
          });
        });
      }).catch(err => {
        // console.log(err)
      });
    },
    ledgers(reload) {
      this.$axios({
        url: api.ledgers,
        data: {}
      }).then(res => {
        if (reload) {
          this.data1 = [];
        }
        res.data.ledgers.map(data => {
          this.data1.push({
            height: data.ledger_index,
            hash: data.ledger_hash,
            count: new BigNumber(data.transactions_count).toFormat(),
            time: dayjs(data.close_time * 1000).format(formatday)
          });
        });
        this.heightVal = res.data.ledgers[0].ledger_index;
        this.tradeVal = res.data.ledgers[0].transactions_count;
        this.nowtime = dayjs(res.data.ledgers[0].close_time * 1000).format(
          formatday
        );
      }).catch(err => {
        console.log(err)
      });
    },
    directLatestBlock(){
      this.$router.push('/block/detail?block=' + this.heightVal)
    },
    loop(s) {
      this.timer = setInterval(() => {
          this.transactions(true);
          this.ledgers(true);
      }, s * 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../assets/css/var.less');
  .banner{
    background: url('../assets/images/banner.jpg') right center no-repeat;
    height:249px;
    .main{
      text-align:center;
      .blogo{padding:40px 0;display:block;}
      .searchbar{
        width:50%;
        margin:0 auto;
      }
    }
  }
  .block{
    margin-top:15px;
    .card{
      height:115px;
      table{
        cursor:pointer;
        box-shadow:0 0 6px rgba(0, 0, 0, .1);
        height:95px;
        text-align: left;
        float: left;
        width: 22.75%;
        span{color:@sdc-txtColor2}
        &:nth-child(1){
          td{
            .iborder{
              border-radius: 50%;
              display: inline-block;
              border: 10px solid #E0F0FF;
              i{
               background:#66B5FF;
              }
            }

          }
        }
        &:nth-child(2){
          margin-left:3%;
          td{
            .iborder{
              border-radius: 50%;
              display: inline-block;
              border: 10px solid #EAE7F8;
              i{
                background:#968DDC;
              }
            }
          }
        }
        &:nth-child(3){
          margin-left:3%;
          td{
            .iborder{
              border-radius: 50%;
              display: inline-block;
              border: 10px solid #DBE6FA;
              i{
                background:#4982ED;
              }
            }
          }
        }
        &:nth-child(4){
          margin-left:3%;
          td{
            .iborder{
              border-radius: 50%;
              display: inline-block;
              border: 10px solid #FFE0E5;
              i{
                background:#FF687B;
              }
            }
          }
        }
        &.no{
          background: #fff;
          color:@txtColor1;
          span{color:@sdc-txtColor2};
        }
        // background:linear-gradient(180deg, #df5173 0%, #f85757 100%);
        // background:#e73c5c;
        td{
          &:first-child{
            padding-left:10%;
            text-align:left;
            width: 45%
          }
          p{
            line-height: 35px;
            margin:0;
            &:nth-child(2){
              font-size:19px;
              color: #2849bc;
            }
          }
          i{
            font-size:30px;
            color:#fff;
            padding:8px;
            border-radius:50%;
            &:first-child{
            }
          }
        }
      }
    }
  }
  .lineChart{
    // margin-top:20px;
    padding:20px 25px;
    .box()
  }
  .tradinglist, .blocklist{
    margin-top:20px;
    min-height: 400px;
    .titlebar{
      padding:15px 20px;
    }
    .box()
  }

  .right {
    float: right;
    color: #1C3591;

    .point {
      width: 10px;
      height: 10px;
      background: #1C3591;
      border-radius: 50%;
    }
  }
</style>
