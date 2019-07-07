import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/page/homepage/Home'
import Detail from '@/page/detail/Detail'
import Order from '@/page/order/Order'
import ShopCart from '@/page/shopcart/ShopCart'
import Succeed from '@/page/succeed/Succeed'
import Donate from '@/page/donate/Donate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'HomePage',
      component:HomePage,
      meta: {
        keepAlive: false //缓存
      }
    },
    {
      path:'/detail',
      name:'Detail',
      component:Detail
    },
    {
      path:'/order',
      name:'Order',
      component:Order
    },
    {
      path:'/shopcart',
      name:'ShopCart',
      component:ShopCart
    },
    {
      path:'/succeed',
      name:'Succeed',
      component:Succeed
    },
    {
      path:'/donate',
      name:'Donate',
      component:Donate
    }
  ]
})
