<template>
    <div class="main">
        <Breadcrumb class="breadcrumb" separator=">">
            <BreadcrumbItem to="/">{{$t('menu.home')}}</BreadcrumbItem>
            <BreadcrumbItem to="/hash">{{$t('account.tit')}}</BreadcrumbItem>            
        </Breadcrumb>
        <div class="info">
            <table>
            <tr>
              <td>
                <i class="iconfont icon-jiaoyi"></i>
              </td>
              <td>xxx</td>
              <td>发行地址：xxxxxxxxxxxxxxxxxxxxxxxxxx</td>
              <td>发行总量：000000000</td>
            </tr>
          </table>
          <div class="desc">
              xxxxxxxxxxxxxxxxxxxxxx
          </div>
        </div>
        <div class="historylist">
            <div class="tab">
                <RadioGroup v-model="type" type="button" size="large" @on-change="handleTab">
                    <Radio label="1">交易记录</Radio>
                    <Radio label="2">通证比例</Radio>
                </RadioGroup>
            </div>
            <Table :columns="thead" :data="data" size="small" :no-data-text="$t('nodata')" :loading="loading"></Table>            
        </div>
        <div class="more">
            <Button :loading="loading" type="primary" ghost>{{$t('more')}}</Button>
        </div>
    </div>
</template>

<script>
import {Table,Button,Breadcrumb,BreadcrumbItem,RadioGroup,Radio} from 'iview'
export default {
    name:'TokenHistory',
    components:{
        Table,Button,Breadcrumb,BreadcrumbItem,RadioGroup,Radio
    },
    data(){
        return {
            loading:false,
            type:'1',
            thead: [
                {
                    title: 'dfwef',
                    key: 'tit',
                },
                {
                    title: 'sdfwefwef',
                    key: 'val'
                },
            ],
            data:[
                {tit:'sdfsdf',val:'dfsefefsef'},
                {tit:'',val:'dfsefefsef'},
                {tit:'sdfsdf',val:'dfsefefsef'},
                {tit:'',val:'dfsefefsef'},
                {tit:'sdfsdf',val:'dfsefefsef'},
                {tit:'',val:'dfsefefsef'},
                {tit:'sdfsdf',val:'dfsefefsef'},
                {tit:'',val:'dfsefefsef'},
                {tit:'sdfsdf',val:'dfsefefsef'},
                {tit:'',val:'dfsefefsef'},
                {tit:'sdfsdf',val:'dfsefefsef'},
                {tit:'',val:'dfsefefsef'},
            ],
        }
    },
    methods:{
        handleTab(){
            this.loading = true
            if(this.type =='1'){
                console.log(1)
            }
            if(this.type =='2'){
                console.log(2)
            }
        }
    }

}
</script>

<style lang="less" scoped>
@import '../assets/css/var.less';
.info{
    
    overflow: hidden;
    .desc{
        .box();
        padding:20px;
        margin:20px 0;
    }
    table{
    box-shadow:0 0 10px rgba(0, 0, 0, .4);
    height:130px;
    text-align: center;
    width: 100%;
    color:#fff;
    background:linear-gradient(180deg, #E15270 0%, #F6555A 100%);
    td{
        i{font-size:50px;}
        &:nth-child(2){            
            font-weight:bold;
            font-size:20px;        
        }
    }
    }
    
}
.historylist{
    .box();
    .tab{
        padding:10px;
    }
}
.more{
    text-align: center;
    padding:30px 0;
}
</style>
