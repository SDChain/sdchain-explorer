<template>
  <div class="main">
    <div class="content">
      <div class="left">

        <a class="abtn"  href="https://www.sdchain.io">{{$t('home.web')[0]}}</a>
        <a class="abtn" href="https://charger.sdchain.io">{{$t('home.web')[1]}}</a>
        <a class="abtn" href="https://cable.sdchain.io">{{$t('home.web')[2]}}</a>
        <a class="abtn" href="https://www.sdchain.io/SD-Wallet">{{$t('home.web')[3]}}</a>

        <span class="abtn">
          <span>{{$t('home.email')}}：</span>
          <span>service@sdchain.io</span>
        </span>
      </div>
      <div class="right">
        <a href="https://forum.sdchain.io/" class="r iconfont icon-luntan"></a>
        <a href="https://m.weibo.cn/u/6447552031" class="r iconfont icon-weibo"></a>
        <a href="https://www.facebook.com/SDchainChinese" class="r iconfont icon-FaceBook_2"></a>
        <a href="https://www.youtube.com/channel/UCJE7KeNkXBm0TPjHCouTMpQ" class="r iconfont icon-youtube"></a>
        <a href="https://github.com/SDChain/" class="r iconfont icon-Github"></a>
        <a href="https://www.reddit.com/r/SDChain/" class="r iconfont icon-reddit"></a>
        <a href="https://medium.com/@sixdomainchain" class="r iconfont icon-medium1"></a>
        <a href="https://twitter.com/sixdomainchain" class="r iconfont icon-twitter"></a>
        <a href="https://t.me/sdchaincn" class="r iconfont icon-telegram"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import '../assets/css/var.less';
.main {
    padding:0;
  .content {
    height: 50px;
    line-height: 50px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
    background-color: #ffffff;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    .left {
      flex: 50;
      display: flex;
      justify-content: space-around;
      a {
        color: #7c7c7c;
        &:hover{
          color: #39579a;
        }
      }
    }
    .right {
      flex: 50;
      display: flex;
      justify-content: space-around;
      font-size: 42px;
      padding-left: 40px;
      a {
        font-size: 32px;
        @media screen and (max-width: @max-width){
            font-size: 28px;
        };
        color: #3a579a;
      }
    }
  }
}
</style>
