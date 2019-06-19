import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import api from './api' // 导入api接口
import 'babel-polyfill' //解决手机浏览器默认不支持promise。
import DrawerLayout from 'vue-drawer-layout'
import utils from './utils/utils'

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$utils = utils

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(DrawerLayout)

new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
