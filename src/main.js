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
import utils from './utils/utils'
// import VConsole from 'vconsole/dist/vconsole.min.js' 
// let vConsole = new VConsole() // 初始化



Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$utils = utils

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)

fastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
