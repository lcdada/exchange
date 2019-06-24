import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/page/homepage/Home'
import Test from '@/page/test/Test'
import Class from '@/page/class/Class'
import Detail from '@/page/detail/Detail'
import Cart from '@/page/cart/Cart'
import Buy from '@/page/buy/Buy'
import Pay from '@/page/pay/Pay'

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
      path:'/cart',
      name:'Cart',
      component:Cart
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
      path:'/class',
      name:'Class',
      component:Class
    },
    {
      path:'/buy',
      name:'Buy',
      component:Buy
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay
    }

    
  ]
})
