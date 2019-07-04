<template>
	<div id="app">
		<div slot="content"> 
			<div class="header">
				<div>
					<van-icon name="wap-nav" slot="left" color="#000" size="20px" @click="goHomePage"/>
				</div>
				<div class="logo_block">
					<img src="./assets/img/logo_text.png" alt="" class="logo_img">
				</div>
				<div>
					<van-icon name="bag-o" slot="right" color="#000" size="20px" @click="goShopCart"/>
				</div>
			</div>
			<div class="center">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive" v-on:public_header="public_header" v-on:public_footer="public_footer"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
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
      goShopCart(){
        this.$router.push('/shopcart');
	  },
	  goHomePage(){
		  this.$router.push('/')
	  }
  }
}
</script>

<style lang="stylus" scoped>
	.header
		width 100%
		height 0.92rem 
		background #fff
		padding 0 0.2rem
		display flex
		justify-content space-between
		align-items center
		box-sizing border-box
		z-index 9
		position fixed
		top 0
		left 0
		.logo_block
			width 2.06rem
			height 0.4rem 				
		.logo_img
			width 100%
			height 100%
			display block
	.center
		margin-top 0.92rem
</style>

