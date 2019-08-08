<template>
    <div class="main">
        <h1>{{$t('token.tit')}} <span>{{$t('token.subtit')}}</span></h1>
        <div class="tokenlist">
            <Table :columns="thead" :data="data" size="default" :no-data-text="$t('nodata')" :loading="loading"></Table>            
        </div>
        <div class="more">
            <Button type="primary" ghost>{{$t('more')}}</Button>
        </div>
    </div>
</template>

<script>
import {Table,Button} from 'iview'
export default {
    name:'Token',
    components:{
        Table,Button
    },
    data(){
        return {
            loading:false,
            thead: [
        {
            title: this.$t('token.head')[0],
            key: 'age'
        },
        {
            title: this.$t('token.head')[1],
            key: 'address',
            render:(h,param) => {
              return h('div',{
                style:'color:#e4526d'
              },
              param.row.address
              )              
            }
        },
        {
            title: this.$t('token.head')[2],
            key: 'address'  
        },
        {
            title: this.$t('token.head')[3],
            key: 'address'
        }
      ],
            data:[{age:'1',address:'dfsefefsef'},{age:'2',address:'dfsefefsef'}],
        }
    },
    created(){
        console.log(this.$route.query.token)
    }

}
</script>
<style lang="less" scoped>
@import '../assets/css/var.less';

.tokenlist{
    .box(); 
}
.more{
    text-align: center;
    padding:30px 0;
}
</style>
