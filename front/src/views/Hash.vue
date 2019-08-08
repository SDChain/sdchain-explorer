<template>
  <div class="main">
    <Breadcrumb class="breadcrumb" separator="<span style='color:#515a6e'>></span>">
      <BreadcrumbItem to="/"><span style="color:#2849bc">{{$t('menu.home')}}</span></BreadcrumbItem>
      <BreadcrumbItem>{{$t('hash.tit')}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="info">
      <div class="body">
        <div class="tit">{{$t('hash.tit')}}： {{$route.query.hash}}</div>
        <div class="flexdiv">
          <table style="border-color:red;">
            <tr>
              <td>
                <span>{{$t('hash.list')[0]}}</span>
                <span class="value">{{info.type == 'Payment' ? this.$t('Payment') : info.type == 'OfferCreate' ? this.$t('OfferCreate') : info.type == 'OfferCancel' ? this.$t('OfferCancel') : info.type == 'AccountSet' ? this.$t('AccountSet') : info.type == 'TrustSet' ? this.$t('TrustSet') : this.$t('other')}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{$t('hash.list')[1]}}</span>
                <span
                  class="err"
                  @click="$router.push(`/account?address=${info.account}`)"
                  style="cursor: pointer;"
                >{{info.account}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{$t('hash.list')[2]}}</span>
                <span
                  v-if="info.destination"
                  class="err"
                  @click="$router.push(`/account?address=${info.destination}`)"
                  style="cursor: pointer;"
                >{{info.destination}}</span>
                <span v-else>--</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{info.type == 'AccountSet' ? $t('hash.text')[0] : info.type == 'TrustSet' ? $t('hash.text')[1] : $t('hash.list')[5]}}</span>
                <span class="value">{{info.amount ? info.amount : '--'}}</span>
              </td>
            </tr>
            <tr style="word-break:break-all;">
              <td>
                <span>{{$t('hash.list')[9]}}</span>
                <span class="value">
                  <template v-for="item in info.amountObjs">
                      <div v-if="item.issuer || item.counterparty">
                        <span style="padding-right:5px;">{{item.currency}}:</span>
                        <span v-if="item.issuer">{{item.issuer}}</span>
                        <span v-else="item.counterparty">{{item.counterparty}}</span>
                      </div>
                      <div v-else>--</div>
                  </template>
                  {{!info.amountObjs ? '--' : ''}}
                </span>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <span>{{$t('hash.list')[4]}}</span>
                <span
                  v-html="info.result == 'tesSUCCESS' ? `<span class = \'success\' >${$t('success')}</span>` : (!info.hasOwnProperty('result') ? '' : `<span class=\'error\'>${$t('error')}</span>`) "
                ></span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{$t('hash.list')[3]}}</span>
                <span class="value">{{info.ledger}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{$t('hash.list')[6]}}</span>
                <span class="value">{{info.fee}} {{$config.currency}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{$t('hash.list')[7]}}</span>
                <span class="value">{{info.time}}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="beizhu">
          <span>{{$t('hash.list')[8]}}</span>
          <div class="remark-body" style="color:#0b0b0b;">
            <template v-for="item in info.simple_memos">
              {{item.memo_data }}
            </template>
            {{!info.simple_memos ? '--' : ''}}
          </div>
        </div>
      </div>
    </div>

    <div class="result">
      <div class="h3" style="font-size:14px">{{$t('hash.tit2')}}</div>
      <template v-if="info.txResults && info.txResults.length">
        <p v-for="(item,index) in info.txResults" :key="index">{{item}}</p>
      </template>
      <span v-if="info.txResults && !info.txResults.length"  style="color:#0b0b0b;">{{$t('nothing')}}</span>
    </div>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from "iview";
import api from "../common/api";
import dayjs from "dayjs";
export default {
  name: "Hash",
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  data() {
    return {
      loading: false,
      info: {
        result: 'tesSUCCESS'
      }
    };
  },
  created() {
    this.transactions();
  },
  mounted() {},
  computed: {},
  watch: {
    "$route.query.hash"() {
      this.transactions();
    }
  },
  methods: {
    transactions() {
      this.loading = true;
      this.$axios(`${api.transactions}/${this.$route.query.hash}`)
        .then(res => {
          this.info = res.data;
          this.info["time"] = dayjs(res.data.time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.loading = false;
        })
        .catch(err => {
          this.$router.push('/err?err=hash')
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/var.less";
.info {
  max-width: @max-width;
  min-width: @min-width;
  margin: 0 auto;
  padding: 0 15px;
  .box();
  margin: 20px 0;
  .tit {
    line-height: 40px;
    font-weight: bold;
    padding-left: 35px;
    color: #213b93;
  }
  .body {
    overflow: hidden;
    padding: 30px 0px 45px 0px;
    .flexdiv {
      display: -webkit-box;
      table {
        width: 50%;
        padding: 0px 35px;
        &:nth-child(2) {
        }
        tr {
          td {
            border-bottom: 1px solid #56505014;
            line-height: 50px;
            overflow: hidden;
            span {
              float: left;
              &:last-child {
                float: right;
              }
              &.err {
                color: #69afff;
              }
              &.value {
                color: #4b5065;
                text-align: right;
              }
            }
            textarea {
              background-color: #f8f9fb;
              border: none;
              resize: none;
              color: #4b5065;
            }
          }
          &:last-child {
            // td{border:none;}
          }
        }
      }
    }
  }
  .beizhu{
    padding: 10px 35px;
    .remark-body {
      color: #4b5065;
      width: 100%;
      padding: 20px;
      margin-top: 15px;
      background-color: #F8F9FB;
      border:none;
      resize: none;
    }
  }
}
.result {
  .box();
  padding: 20px;
  padding-top: 0px;
  .h3 {
    height: 50px;
    line-height: 70px;
    border-bottom: 1px solid #56505014;
    color: #213b93;
    font-weight: bold;
  }
}
.demo-breadcrumb-separator{
  font-weight: bold
}
</style>
