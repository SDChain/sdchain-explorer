<template>
    <div class="main">
        <div class="detail">
            <div class="left">
                <div class="img-wrapper">
                    <div class="img-box">
                        <img :src="info.img" class="img">
                    </div>
                    <div class="name">
                        {{ info.currency }}
                    </div>
                </div>
                <div class="ul-wrapper">
                    <ul>
                        <li class="line"><span>{{ $t('assets_detail.from') }}： </span><span style="display:inline-block;padding-left:10px" class="value">{{ info.address }}</span></li>
                        <li class="line"><span>{{ $t('assets_detail.amount') }}：</span><span style="display:inline-block;padding-left:10px" class="value">{{ info.limit }}</span> <span style="padding:0 20px">/</span> <span>{{ $t('assets_detail.total') }}：</span> <span style="padding-left: 10px" class="value">{{ totalCirculation }}</span> </span></li>
                        <li style="list-style:none;display:flex"><span>{{ $t('assets_detail.desc') }}：</span><span style="display:inline-block; padding-left:10px;width:70%;word-wrap:break-word;" class="value">{{ info.desc }}</span></li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <span style="padding-left:10%;color:#1C3591;font-weight:800">{{ $t('assets_detail.trading')}}</span>
                <div >
                    <ChartAssets :currency="this.$route.query.currency"></ChartAssets>
                </div>
            </div>
        </div>
        <div class="list">
            <Tabs value="record" type="card">
                <TabPane :label="$t('assets_detail.transactions')" name="record">
                    <div class="record">
                        <Table :loading="loading" :columns="thead" :data="recordList" size="small" :no-data-text="$t('nodata')"></Table>
                        <div class="more" v-if="ismore">
                            <Button :loading="more" @click="loadMore" type="primary" ghost>{{$t('assets_detail.loadmore')}}</Button>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="$t('assets_detail.addrratio')" name="proportion">
                    <div class="proportion">
                        <Table :columns="columns" :data="proportionList" size="small" :no-data-text="$t('nodata')"></Table>
                    </div>
                </TabPane>
            </Tabs>
        </div>
  </div>
</template>

<script>
import {Table, Tabs, TabPane, Button} from 'iview'
import ChartAssets from '../components/ChartAssets'
import api from '../common/api'
import dayjs from 'dayjs'
import config from '../config'
import BigNumber from 'bignumber.js'

export default {
    components: {
        Table,
        Tabs,
        TabPane,
        ChartAssets,
        Button
    },
    data() {
        return {
            chartShow: true,
            totalCirculation: '',
            info: {
                img: '',
                currency: '',
                address: '',
                limit: '',
                desc: ''
            },
            loading: false,
            more: false,
            ismore: false,
            marker: '',
            limit: 10,
            thead: [
                {
                    title: this.$t('assets_detail.hash'),
                    key: "hash",
                    width: 500,
                    align: "left",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                overflow: 'hidden',
                                // 'text-overflow':'ellipsis',
                                // 'white-space': 'nowrap',
                                color:  params.row.success == 'tesSUCCESS' ? '#4da1ff' : 'red',
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                    this.$router.push({path: '/hash', query: {hash: params.row.hash}})
                                }
                            }
                        }, params.row.hash)
                    }
                },
                {
                    title: this.$t('assets_detail.type'),
                    key: "type",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color:  params.row.success !== 'tesSUCCESS' ? 'red' : '#515a6e',
                            }
                        }, params.row.type)
                    }
                },
                {
                    title: this.$t('assets_detail.tradingvolume'),
                    key: "num",
                    align: "center",
                    render: (h,params) => {
                        return h('span', {
                            style: {
                                color:  params.row.success !== 'tesSUCCESS' ? 'red' : '#515a6e',
                            }
                        }, params.row.num)
                    }
                },
                {
                    title:  this.$t('assets_detail.time'),
                    key: "time",
                    align: "right",
                },
            ],
            recordList: [],
            page: 1,
            pageSize: 20,
            columns: [
                {
                    title: '#',
                    key: "index",
                    align: "left",
                    width: 120
                },
                {
                    title: this.$t('assets_detail.address'),
                    key: "address",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: '#4da1ff',
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                    this.$router.push({path: '/account', query: {address: params.row.address}})
                                }
                            }
                        }, params.row.address)
                    }
                },
                {
                    title: this.$t('assets_detail.number'),
                    key: "num",
                    align: "center",
                },
                {
                    title: this.$t('assets_detail.ratio'),
                    key: "proportion",
                    align: "left",
                    render: (h, params) => {
                        const rate = (params.row.proportion * 100).toFixed(2)
                        const rateStr = rate < 0.01 ? '< 0.01%' : rate + '%'
                        return h('i-progress', {
                            props: {
                                percent: Number(rate),
                                'stroke-width': 15,
                            }
                        }, rateStr)
                    }
                },
            ],
            proportionList: []
        }
    },

    created() {
        this.loading = true
        this.getDetail()
        this.getProportion()
    },

    watch: {
        $route: {
            handler() {
                this.recordList = []
                this.proportionList = []
                this.getDetail()
                this.getProportion()
            }
        }
    },

    methods: {
        //二级通证信息
        getDetail() {
            this.$axios({
                url: api.secondCurrencyDetail,
                method: 'get',
                params: {
                    currency: this.$route.query.currency
                }
            }).then(res => {
                let data = res.data.data
                this.info = {
                    img: data.logo,
                    currency: data.currency,
                    address: data.counterparty,
                    limit: new BigNumber(data.amount).toFormat(),
                    desc: data.desc
                }
                let address = data.counterparty
                this.getTotalCirculation(address)
                this.getTransactionRecord(address)
            }).catch(err => {
                this.$router.push('/err?err=account')
            })
        },

        //流通总量
        getTotalCirculation(address) {
            this.$axios({
                url: api.totalCirculation,
                method: 'get',
                params: {
                    address: address
                }
            }).then(res => {
              if (res.data.hasOwnProperty('obligations')) {
                let obligation = res.data.obligations[this.$route.query.currency]
                this.totalCirculation = new BigNumber(obligation).toFormat()
              } else {
                this.totalCirculation = '--'
              }
            }).catch(err => {
                console.log(err)
            })
        },

        //二级通证交易记录
        getTransactionRecord(account) {
            this.account = account
            this.$axios(
                `${api.secondCurrencyTransactionList(account)}?limit=${this.limit}&marker=${this.marker}&currency=${this.$route.query.currency}`
            ).then(res => {
                let data = res.data.transactons
                data.forEach(element => {
                    this.recordList.push({
                        hash: element.hash,
                        success: element.result,
                        type: element.type == 'TrustSet' ? this.$t('assets_detail.trustset') :
                        element.type == 'Payment' ? this.$t('assets_detail.payment') :
                        element.type == 'AccountSet' ? this.$t('assets_detail.accountset') :
                        element.type == 'OfferCreate' ? this.$t('assets_detail.offercreate') :
                        element.type == 'OfferCancel' ? this.$t('assets_detail.offercancel') :
                        element.type == 'MultiPayment' ? this.$t('assets_detail.multipayment') :
                        this.$t('assets_detail.other'),
                        num: element.amount ? element.amount : '--',
                        time:dayjs(element.time).format('YYYY-MM-DD HH:mm:ss') ,
                    })
                });
                this.ismore = res.data.marker ? true : false
                this.marker = res.data.marker || ''
                this.loading = false
                this.more = false
            }).catch(err => {
                console.log(err)
            })

        },

        //加载更多
        loadMore() {
            this.more = true
            this.getTransactionRecord(this.account)
        },


        //通证比例
        getProportion() {
            let currency = this.$route.query.currency
            this.$axios({
                url: api.secondCurrencyProportion,
                method: 'get',
                params: {
                    page: this.page,
                    rows: this.pageSize,
                    currency: currency
                }
            }).then(res => {
                let data = res.data.data.resArr
                data.forEach((val, index) => {
                    if (val.percent > 0) {
                        this.proportionList.push({
                            index: index + 1,
                            address: val.counterparty,
                            num: new BigNumber(val.value).toFormat(),
                            proportion: val.percent
                        })
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/main.less";
.main {
    margin-top: 20px;
    .detail {
        display: flex;
        box-shadow:0 0 10px rgba(0, 0, 0, .05);
        background-color: #ffffff;
        margin-bottom: 20px;
        padding-bottom: 20px;
        .left {
            width: 45%;
            padding-top: 20px;
            padding-left: 25px;

            .img-wrapper {
                clear: both;
                height: 65px;

                .img-box {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    float: left;

                    .img {
                        width: auto;
                        height: auto;
                        max-width: 60px;
                        max-height: 60px;
                    }
                }

                .name {
                    margin-left: 12px;
                    margin-top: 12px;
                    color: #1b3591;
                    font-size: 24px;
                    font-weight: bold;
                    float: left;
                }
            }

            .ul-wrapper {
                clear: both;
                margin-top: 20px;
            }

            .line{
                display: flex;
                list-style:none;
                margin-bottom: 15px;
                border-bottom: 1px solid #ebebeb;
                padding-bottom: 8px;
            }
        }
        .right{
             padding-top: 25px;
             flex:1;
        }
    }
    .list {
        background-color: #ffffff;
        margin-bottom: 30px;
        box-shadow:0 0 10px rgba(0, 0, 0, .05);
        .record{
            margin: 0px 20px;
            .failure {
                color: red
            }
            .success {
                color: #4da1ff
            }
        }
        .proportion {
            margin: 0px 20px;
        }
    }
}
.more {
  text-align: center;
  padding: 30px 0;
}

.nodata {
    margin:30px 30px 0px 60px;
    font-size:15px;
    height:250px;
    box-shadow:0 0 10px rgba(0, 0, 0, .05);
    text-align:center;
    line-height:250px
}

.value {
    color: #0b0b0b;
}
/deep/.ivu-progress-bg{
    border-radius: 3px;
}
/deep/.ivu-progress-inner{
    border-radius: 3px;
}
</style>

