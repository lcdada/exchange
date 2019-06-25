<template>
  <div id="app">
        <div slot="content"> 
          <div class="header">
             <van-nav-bar title="标题"  fixed >
                <van-icon name="bars" slot="left" @click="handleMaskClick"/>
                <van-icon name="bag-o" slot="right"  @click="goShopCart"/>
              </van-nav-bar>
          </div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" v-on:public_header="public_header" v-on:public_footer="public_footer"></router-view>
          </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          <!-- <app-footer v-if="footer_show"></app-footer> -->
        </div>
  </div>
</template>

<script>
import AppHeader from './components/Header'
// import AppFooter from './components/Footer'
import {DrawerLayout} from 'vue-drawer-layout'
import {NavBar,Icon} from 'vant'

export default {
  name: 'App',
  data () {
    return {
      header_show:true,
      footer_show:true,

    }
  },
  components:{
      AppHeader,
      // AppFooter,
      [DrawerLayout.name]:DrawerLayout,
      [NavBar.name]:NavBar,
      [Icon.name]:Icon
  },
   methods:{
      //是否显示头部
      public_header:function (bool) {
        this.header_show = bool;
      },
      //是否显示底部
      public_footer:function (bool) {
          this.footer_show = bool;
      },
       handleMaskClick() { 
        this.$refs.drawer.toggle();
       },
       goShopCart(){
         this.$router.push('/shopcart');
       }
  }
}
</script>

<style lang="stylus" scoped>
    .header
        padding-bottom 0.92rem
</style>

