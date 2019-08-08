<template>
    <div class="main">
        <p>{{$t('e404')}}</p>
    </div>
</template>

<script>
import {Input} from 'iview'
export default {
    name:'Err',
    components:{
        Input
    },
    data(){
        return {

        }
    }

}
</script>
<style lang="less" scoped>
.main{
    text-align:center;
    padding-top:10%;
    p{
        font-size:120px;
        padding:20px 0;
    }
}
</style>
