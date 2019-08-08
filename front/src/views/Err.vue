<template>
  <div class="main">
    <img src="../assets/images/err.png" alt>
    <p class="txt">{{$t('err' + err)}}</p>
    <p>
      <Button type="primary" @click="$router.push('/')">{{$t('backhome')}}</Button>
    </p>
  </div>
</template>

<script>
import { Button } from "iview";
export default {
  name: "Err",
  components: {
    Button
  },
  data() {
    return {
      err: "err"
    };
  },
  created() {
    this.err = this.$route.query.err;
  }
};
</script>
<style lang="less" scoped>
@import '../assets/css/var.less';
.main {
  text-align: center;
  padding-top: 8%;
  .txt {
    font-size: 22px;
    padding: 20px 0;
    color: #000;
    font-weight: 540;
  }
}
.ivu-btn-primary{
    border-color: #fff;
    background-color: #fff;
    color:@sdc-mainColor1;
    font-size: 14px;
    padding: 6px 16px;
}
</style>
