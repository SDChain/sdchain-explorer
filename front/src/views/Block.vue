<template>
    <div class="main">
        <div class="blocklist">
            <h1>{{$t('block.tit')}}</h1>
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
import BigNumber from 'bignumber.js'
export default {
    name:'Block',
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
                    title: this.$t('block.head')[0],
                    key: 'height',
                    width:120,
                    render:(h,param) => {
                    return h('router-link',{
                        style:'color:#4ea1fd',
                        props:{
                        to:'/block/detail?block=' + param.row.height
                        },
                    },
                    param.row.height
                    )}
                },
                {
                    title: this.$t('block.head')[1],
                    key: 'hash',
                    align:'center'
                },
                {
                    title: this.$t('block.head')[2],
                    key: 'count',
                    align:'center',
                    width:100
                },
                {
                    title: this.$t('block.head')[3],
                    key: 'time',
                    align:'right',
                    width:200
                }
            ],
            data:[],
        }
    },
    created(){
        this.loading = true
        this.ledgers()
    },
    methods:{
        ledgers(){
            this.$axios(`${api.ledgers}?limit=${this.limit}&marker=${this.marker}`).then( res => {
                const list = res.data.ledgers
                list.map(data => {
                    this.data.push({
                        height:data.ledger_index,
                        hash:data.ledger_hash,
                        count: new BigNumber(data.transactions_count).toFormat(),
                        time:dayjs(data.close_time*1000).format('YYYY-MM-DD HH:mm:ss') ,
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
            this.ledgers()
        }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/var.less';

.blocklist{
    .box();
    background-color: #fff;
    padding:0 15px;
    h1{
        padding-top:10px;
    }
}
.more{
    text-align: center;
    padding:30px 0;
}
</style>
