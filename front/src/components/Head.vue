<template>
  <div class="head">
    <div class="main">
      <Logo class="tlogo" />
      <div class="rpart">
        <div class="menu">
          <ul>
            <li v-for="(nav,index) in menu" :key="index" @click="jump(nav.url)" :class="$route.meta == nav.tit ?'a-cur':''">
              <a >{{ $t('menu.' + nav.tit) }}</a>
            </li>
          </ul>
          <Search type="head" />
        </div>
        <span class="lang">
          <i class="iconfont icon-shixindiqiu white-color"></i>
            <Dropdown trigger="click" placement="bottom-end" class="langlist" @on-click="handleLang">
              <a href="javascript:void(0)">
                  {{$t('language')}}
                  <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <template v-for="(item,index) in langList">
                  <DropdownItem :name="item.val" :key="index">{{item.tit}}</DropdownItem>
                </template>
              </DropdownMenu>
            </Dropdown>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
import {Dropdown,DropdownMenu,DropdownItem,Icon} from 'iview'
import Search from './Search'
import { list } from '../lang'
export default {
  inject:['reload'],
  name: 'Head',
  components:{
    Logo,Dropdown,DropdownMenu,DropdownItem,Icon,Search
  },
  data(){
    return {
      menu:[{
        tit:'home',
        url:'/',
      },
      {
        tit:'block',
        url:'/block',
      },
       {
        tit:'assets',
        url:'/assets',
      },
      {
        tit:'history',
        url:'/history',
      },],
      langList:list,
    }
  },
  mounted(){

  },
  methods:{
    jump(url){
      this.$router.push(url)
    },
    handleLang(val){
      localStorage.Lang = val
      this.$i18n.locale = val
      this.reload()
    }
  }
}
</script>

<style scoped lang="less">
@import url('../assets/css/var.less');
.head{
  min-width: @min-width;
  // background:  url('../assets/images/headbg.png') no-repeat;
  background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#66B5FF), to(#4881EC));
  background-size: 100% 100%;
  // border-bottom: 1px solid #DDDCDC;
  .tlogo{
    display: inline-block;
    line-height: 70px;
    height: 70px;
  }
  .rpart{
    display: inline-block;
    text-align: right;
    float: right;
    }
  .menu{
    display: inline-block;
    vertical-align: middle;
    text-align:right;
    font-size: 15px;
    ul{
      display: inline-block;
      vertical-align: middle;
      padding-right: 15px;
      li{
        float: left;
        list-style:none;
        cursor: pointer;
        color:@txtColor1;
        display:block;
        height:70px;
        line-height: 70px;
        &.a-cur{
            background:#73B1FA;
        }
        a{
          // color:#2B334E;
          color:#fff;
          padding: 5px 18px;
          &:hover{
             font-weight: bold;
          }
        }
        &.cur{
          position: relative;
          &::after{
            content:'';
            position:absolute;
            bottom:-1px;
            width:100%;
            height:2px;
            left:0;
          }
        }
        &.cur, &:hover{
          color:@txtColor2;
        }
      }
    }
  }
  .lang{
    display: inline-block;
    vertical-align:middle;
    font-size:12px;
    i{
      display: inline-block;
      font-size:20px;
      opacity:.5;
      margin-right:5px;
    }
    span{
      color:#6D5353;
      display: inline-block;
    }
    .langlist{
      position: relative;
      top:-3px;
      a{color:#fff;}
      li{
        text-align: center;
      }
    }
  }
}
.ivu-input {
    font-size: 12px;
}
.white-color{
  color:#fff;
}
</style>
