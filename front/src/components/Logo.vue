<template>
  <span class="logo">
      <router-link to="/"><img src="../assets/images/logo.png" alt=""><span class="TT">{{$t("menu.title")}}</span></router-link>
  </span>
</template>

<script>
export default {
  name: 'Logo',
  mounted(){

  },
}
</script>

<style scoped lang="less">
    .logo{
      font-size:30px;
      font-weight: bold;
      img{vertical-align: middle;
      height: 53px;
      display: inline-block;
      padding-right: 10px;
      margin-top: 8px;
      }
      span{
        display: inline-block;
        color:#fff;
        font-size: 28px;
        font-weight: bold;
      }
      .TT{
        color:#fff;
      }
    }
</style>
