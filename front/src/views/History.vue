<template>
    <div class="main">
        <div class="historylist">
            <h1>{{$t('history.tit')}}</h1>
            <Table :columns="thead" :data="data" size="default" :no-data-text="$t('nodata')" :loading="loading"></Table>
        </div>
        <div class="more" v-if="ismore">
            <Button type="primary" @click="loadMore" :loading="more" ghost>{{$t('more')}}</Button>
        </div>
    </div>
</template>

<script>
import {Table,Button} from 'iview'
import api from '../common/api'
import dayjs from 'dayjs'
export default {
    name:'History',
    components:{
        Table,Button
    },
    data(){
        return {
            loading:false,
            more: false,
            limit:15,
            marker:'',
            ismore:false,
            thead: [
        {
            title: this.$t('home.head2')[0],
            key: 'hash',
            width: 550,
            render:(h,param) => {
              return h('router-link',{
                style:'color:#4ea1fd',
                props:{
                  to:'/hash?hash=' + param.row.hash
                },
              },
              param.row.hash
              )
            }
        },
        {
            title: this.$t('home.head2')[1],
            key: 'type',
            align:'center'
        },
        {
            title: this.$t('home.head2')[2],
            key: 'count',
            align:'right'
        },
        {
            title: this.$t('home.head2')[3],
            key: 'time',
            align:'right'
        }
      ],
            data:[],
        }
    },
    created(){
        this.loading = true
        this.transactions()
    },
    methods:{
        transactions(){
            this.$axios(`${api.transactions}?limit=${this.limit}&marker=${this.marker}`).then( res => {
                const list = res.data.transactons
                list.map(data => {
                    this.data.push({
                        hash: data.hash,
                        type: data.type == 'Payment' ? this.$t('Payment') :
                                data.type == 'OfferCreate' ? this.$t('OfferCreate') :
                                data.type == 'OfferCancel' ? this.$t('OfferCancel') :
                                data.type == 'AccountSet' ? this.$t('AccountSet') :
                                data.type == 'TrustSet' ? this.$t('TrustSet') :
                                this.$t('other'),
                        count: data.amount ? data.amount : '--',
                        time: dayjs(data.time).format('YYYY-MM-DD HH:mm:ss'),
                    })
                })
                this.ismore = res.data.marker ? true : false
                this.marker = res.data.marker
                this.loading = false
                this.more = false
            }).catch(err => {
                console.log(err)
            })
        },
        loadMore(){
            this.more = true
            this.transactions()
        }
    }

}
</script>

<style lang="less" scoped>
@import '../assets/css/var.less';

.historylist{
    .box();
    background-color: #fff;
    padding: 0 15px;
    h1{
        padding-top: 10px;
    }
}
.more{
    text-align: center;
    padding:30px 0;
}
</style>
