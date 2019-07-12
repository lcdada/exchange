<template>
	<div id="app">
		<div>
			<van-popup
			v-model="show"
			position="left"
			:lock-scroll="true"
			:style="{ height: '100.5%' }"
			class="pop"
				>
				<div ref="wrapper" class="wrapper">
					<div class="class_img">
						<img src="./assets/img/logo_icon.png" alt="">
					</div>
					<ul >
						<li class="item" @click="goStore">
							<p class="class_item">前往商城</p>
							<van-icon name="arrow"  class="arrow"/>
						</li>
						<li class="item" @click="Donate">
							<p class="class_item">转增</p>
							<van-icon name="arrow"  class="arrow"/>
						</li>
						<!-- <li
						v-for="item in class_list"
						:key="item.id"
						class="item"
						@click="goClassList(item)"
						>
							<p class="class_item">{{item.name}}</p>
							<van-icon name="arrow"  class="arrow"/>
						</li> -->
					</ul>
				</div>
			</van-popup>
		</div>
		<div slot="content"> 
			<div class="header">
				<div>
					<van-icon name="wap-nav" slot="left" color="#000" size="20px" @click="goHomePage"/>
					<!-- <van-icon name="shop-collect" slot="left" color="#000" size="20px" @click="Transferr"/> -->
				</div>
				<div class="logo_block">
					<img src="./assets/img/logo_text.png" alt="" class="logo_img" @click="goHome">
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
import {NavBar,Icon,Popup} from 'vant'

export default {
  name: 'App',
  data () {
    return {
      header_show:true,
	  footer_show:true,
	  show: false

    }
  },
  components:{
      [DrawerLayout.name]:DrawerLayout,
      [NavBar.name]:NavBar,
	  [Icon.name]:Icon,
	  [Popup.name]:Popup
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
		  this.show = true
	  },
	  goStore(){
		   window.location.href = www.baidu.com
	  },
	  Transferr(){
		  this.$router.push({path:'/donate'})
	  },
	  goHome(){
		  this.show = false
		  this.$router.push({path:'/'})
	  },
	  Donate(){
		  this.show = false
		  this.$router.push({path:'/donate'})
	  }
  }
}
</script>

<style lang="stylus" scoped>
	.van-popup
		max-height 100.5%
		.wrapper
			width 3.2rem
			.class_img
				height 0.92rem
				line-height 0.92rem
				padding-left 0.3rem
			.item 
				height: 0.9rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0.3rem;
				box-sizing: border-box;
				.class_item 
					font-size: 0.28rem;
					font-weight: 500;
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
			height 0.48rem 				
		.logo_img
			width 100%
			height 100%
			display block
	.center
		margin-top 0.92rem
</style>

