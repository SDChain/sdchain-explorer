<template>
    <div class="main" >
        <Breadcrumb class="breadcrumb" separator="<span style='color:#515a6e'>></span>">
            <BreadcrumbItem to="/"><span style="color:#2849bc">{{$t('wallet.home')}}</span></BreadcrumbItem>
            <BreadcrumbItem to="">{{$t('wallet.wallet_address')}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="accountinfo">
            <div class="address">{{$t('wallet.wallet_address')}}：{{addr}}
                <Tooltip :content="$t('wallet.tipqr')" placement="top"><i class="iconfont icon-erweima" @click="qr = true"></i></Tooltip>
                <Tooltip :content="$t('wallet.tipcopy')" placement="top"><i class="iconfont icon-fuzhi"
                v-clipboard:copy="addr"
                v-clipboard:success="copysuc"
                v-clipboard:error="copyerr"
                ></i></Tooltip>
            </div>
            <div v-if="balancesList.length !== 0">
                <ul class='balance'>
                    <li>
                        {{balancesList[0].currency}} {{$t('wallet.balance')}}：<span class="val">{{balance}}</span>
                        <span class="err" style="margin-left:10px">{{balancesList[0].counterparty ? `(${balancesList[0].counterparty})`:''}}</span>
                    </li>
                    <li class="assets" v-if="!issuer && balancesList[1]">
                        {{$t('wallet.passport')}}：<span style="padding-left:50%;" class="value">{{ secondBalance }}</span><span class="uni">{{ balancesList[1].currency }}</span><a href="javascript:;" @click="more">{{$t('wallet.more')}}>></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="accountlist">
            <Table :columns="thead" :data="data" size="small" :no-data-text="$t('nodata')" :loading="loading"></Table>
        </div>
        <div class="more" v-if="ismore">
            <Button type="primary" ghost @click="loadMore" :loading="pageLoading">{{$t('wallet.loadmore')}}</Button>
        </div>
        <Modal
            :title="$t('wallet.wallet_address')"
            footer-hide
            v-model="qr"
            class-name="vertical-center-modal">
            <div style="text-align:center">
                <vue-qr :text="addr" :margin="0" :logoSrc="logoSrc"  :size="300"></vue-qr>
            </div>
            <div class="w-addr">{{addr}}</div>
        </Modal>
    </div>
</template>

<script>
import {Table,Button,Breadcrumb,BreadcrumbItem,Modal,Tooltip,Select,Option} from 'iview'
import api from '../common/api'
import VueQr from 'vue-qr'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'

export default {
    name:'Account',
    components:{
        Table,Button,Breadcrumb,BreadcrumbItem,Modal,VueQr,Tooltip,Select,Option
    },
    data(){
        return {
            balance: 0,
            secondBalance: 0,
            issuer: '',
            loading:false,
            pageLoading: false,
            limit:15,
            marker:'',
            ismore:false,
            qr:false,
            addr:this.$route.query.address,
            logoSrc:require('../assets/images/qrlogo.png'),
            choose:'',
            balancesList:[],
            thead: [{
                title: this.$t('wallet.hash'),
                key: 'hash',
                 width: 500,
                render:(h,param) => {
                    return h('router-link',{
                        style:'color:sdc-mainColor1',
                        props:{
                        to:'/hash?hash=' + param.row.hash
                        },
                    },
                    param.row.hash
                    )
                }
            },
            {
                title: this.$t('wallet.type'),
                key: 'type',
                align:'center',
                render: (h,params) => {
                  return h('span', {
                    style: {
                      color: params.row.sourceType == 'Payment' ? (this.$route.query.address == params.row.destination ? '#228B22': '#FF4500') : '#515b6e'
                    }
                  }, params.row.type)
                }
            },
            {
                title: this.$t('wallet.num'),
                key: 'count',
                align:'right'
            },
            {
                title: this.$t('wallet.time'),
                key: 'time',
                align:'right'
            }],
            data:[],
        }
    },
    created(){
        this.loading = true
        this.isIssuer()
        this.accounts()
        this.balances()
    },
    watch:{
        '$route.query.address' (){
            this.marker = ''
            this.data = []
            this.addr = this.$route.query.address
            this.isIssuer()
            this.accounts()
            this.balances()
        }
    },
    methods:{
        //判断是否是发行商
        isIssuer() {
            this.$axios({
                url: api.isIssuer,
                method: 'get',
                params: {
                    address: this.$route.query.address
                }
            }).then(res => {
                this.issuer = res.data.settings.default_spread
            }).catch(err => {
                console.log(err)
            })
        },

        copysuc(e){
            this.$Message.success(this.$t('copysuc'))
        },
        copyerr(e){
            this.$Message.error(this.$t('copyerr'))
        },
        balances(){
            this.$axios(`${api.balances}/${this.$route.query.address}`).then( res => {
                this.balancesList = res.data.balances
                this.balance = new BigNumber(res.data.balances[0].value).toFormat()
                if (res.data.balances[1]) {
                  this.secondBalance = new BigNumber(res.data.balances[1].value).toFormat()
                }
            }).catch(err => {
                this.$router.push('/err?err=account')
            })
        },
        accounts(){
            this.$axios(`${api.accounts}/${this.$route.query.address}/transactions?marker=${this.marker}&limit=${this.limit}`).then( res => {
                const list = res.data.transactons
                if(list.length > 0){
                    list.map(data => {
                        this.data.push({
                            hash:data.hash,
                            type:  data.type == 'TrustSet' ? this.$t('wallet.trustset') :
                                    data.type == 'AccountSet' ? this.$t('wallet.accountset') :
                                    data.type == 'OfferCreate' ? this.$t('wallet.offercreate') :
                                    data.type == 'OfferCancel' ? this.$t('wallet.offercancel') :
                                    data.type == 'MultiPayment' ? this.$t('wallet.multipayment') :
                                    data.type == 'Payment' ? (this.$route.query.address == data.destination ? this.$t('wallet.incoming') : this.$t('wallet.outgoing')) :
                                    this.$t('wallet.other'),
                            count: data.amount ? data.amount : '--',
                            time:dayjs(data.time).format('YYYY-MM-DD HH:mm:ss') ,
                            destination: data.destination,
                            sourceType: data.type
                        })
                    })
                }
                this.ismore = res.data.marker ? true : false
                this.marker = res.data.marker || ''
                this.loading = false
                this.pageLoading = false
            }).catch(err => {
                console.log(err)
            })
        },
        loadMore(){
            this.pageLoading = true
            this.accounts()
        },

        //二级通证更多
        more() {
            this.$router.push({path: '/assetslist', query: {address: this.$route.query.address}})
        }
    },

}
</script>

<style lang="less" scoped>
@import '../assets/css/var.less';
.accountinfo{
    .box();
    padding:10px 20px;
    margin-bottom:20px;
    overflow: hidden;
    .iconfont{
        font-size:20px;
        cursor: pointer;
        color:@sdc-mainColor1;
        padding:5px;
        &:hover{
            background:@mainbg;
            border-radius:50%;
        }
    }
    .balance{
        li{
            float: left;
            width:45%;
            list-style:none;
            line-height:30px;
            border-bottom: 1px solid #DDDCDC;
            .val{
                color:#4b5065;
                float: right;
                padding-right: 30px;
            }
            &.assets{
                float: left;
                width:45%;
                margin-left: 10%;
                .uni{
                    color: @sdc-mainColor1;
                    padding-left: 10px;
                    color:#4b5065;
                }
                a{
                    float: right;
                    color: #7c7c7c;
                }
            }
        }

    }
    .address{
        border-bottom: 1px solid #DDDCDC;
        margin-bottom:8px;
        padding-bottom:8px;
        color:@sdc-txtColor3;
    }
    .rinfo, .linfo{
        list-style:none;
        display: inline-block;
        width:50%;
    }
    .rinfo{
        text-align:right;
        .select{text-align: left;margin-left:20px;}
    }

}
.accountlist{
    .box();
}
.more{
    text-align: center;
    padding:30px 0;
}
.w-tit{
    font-size: 22px;
    color:#515a6e;
    text-align: center;
}
.w-addr{
    font-size: 22px;
    color:#1B3692;
    text-align: center;
}
.value {
    color:#4b5065;
}
</style>
