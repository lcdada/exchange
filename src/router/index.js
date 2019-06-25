import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/page/homepage/Home'
import Test from '@/page/test/Test'
import Class from '@/page/class/Class'
import Detail from '@/page/detail/Detail'
import Order from '@/page/order/Order'
import ShopCart from '@/page/shopcart/ShopCart'
import NowBuy from '@/page/nowbuy/NowBuy'
import Address from '@/page/address/Address'
import Buy from '@/page/buy/Buy'
import Pay from '@/page/pay/Pay'
import Succeed from '@/page/succeed/Succeed'

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
      path:'./address',
      name:'Address',
      component:Address
    },
    {
      path:'/buy',
      name:'Buy',
      component:Buy
    },
    {
      path:'/test',
      name:'Test',
      component :Test,
      meta: {
        keepAlive: false //缓存
      }

    },
    {
      path:'/shopcart',
      name:'ShopCart',
      component:ShopCart
    },
    {
      path:'/nowbuy',
      name:'NowBuy',
      component:NowBuy
    },
    {
      path:'/succeed',
      name:'Succeed',
      component:Succeed
    },
    {
      path:'/class',
      name:'Class',
      component:Class
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay
    }
  ]
})
