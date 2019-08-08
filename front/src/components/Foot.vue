<template>
  <div class="foot">
    <BottomBar v-if="this.$route.meta&&this.$route.meta=='home'"/>
    <div class="main">
      <span class="txt"> {{$t('copyright')}}</span>
    </div>
  </div>
</template>

<script>
import BottomBar from "../components/BottomBar";
export default {
  name: 'Foot',
  components:{
    BottomBar
  },
  mounted(){

  },
}
</script>

<style scoped lang="less">
  .foot{
    text-align:center;
    padding:2px 0;
    background:#FFFFFF;
    .flogo{
      display: inline-block;
      transform:scale(.4,.4);
    }
    .txt{
      font-size:12px;
      position: relative;
      bottom: 3px;
    }
  }

</style>