import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
   },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:'home'
    },
    {
      path: '/token/history',
      name: 'TokenHistory',
      component: () => import( './views/TokenHistory.vue'),
      meta:'token'
    },
    {
      path: '/hash',
      name: 'hash',
      component: () => import( './views/Hash.vue'),
      meta:'hash'
    },
    {
      path: '/block',
      name: 'block',
      component: () => import( './views/Block.vue'),
      meta:'block'
    },
    {
      path: '/assets',
      name: 'assets',
      component: () => import( './views/Assets.vue'),
      meta:'assets'
    },
    {
      path: '/assets/detail',
      name: 'assetsDetail',
      component: () => import( './views/AssetDetail.vue'),
    },
     {
       path: '/assetslist',
       name: 'assetsList',
       component: () => import( './views/AssetsList.vue'),
         meta:'assetslist',
     },
    {
      path: '/block/detail',
      name: 'BlockDetail',
      component: () => import( './views/BlockDetail.vue'),
      meta:'block'
    },
    {
      path: '/account',
      name: 'account',
      component: () => import( './views/Account.vue'),
      meta:'account'
    },
    {
      path: '/history',
      name: 'history',
      component: () => import( './views/History.vue'),
      meta:'history'
    },
    {
      path: '/err',
      name: 'err',
      component: () => import( './views/Err.vue'),
      meta:'err'
    },
    {
      path: '*',
      name: '404',
      component: () => import( './views/404.vue'),
      meta:'404'
    }
  ]
})
