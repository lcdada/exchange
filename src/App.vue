<template>
	<div id="app">
		<div slot="content"> 
			<div class="header">
				<div>
				</div>
				<div class="cartNumberBlock">
					<p @click="Donate">转赠</p>
				</div>
			</div>
			<div class="center">
					<router-view v-on:public_header="public_header" v-on:public_footer="public_footer" ></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import {DrawerLayout} from 'vue-drawer-layout'
import {NavBar,Icon,Popup} from 'vant'
import utils from '@/utils/utils'

export default {
  name: 'App',
  data () {
    return {
      header_show:true,
	  footer_show:true,
	  show: false,
	  showGoodsCartNumber:true,
	  addgoods:utils.getUrlKey('addgoods')

    }
  },
  created() {
	  this.init()
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
		  if(this.$route.query.addgoods!=undefined){
			    this.$router.push({path:'/shopcart' ,query:{addgoods:"addgoods"}});
		  }else{
				this.$router.push('/shopcart');
		  }
     
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
	  },
	  init(){
		  if(this.$store.getters.carCount == 0){
			  this.showGoodsCartNumber = false
			//   console.log(this.$store.getters.carCount)
		  }
	  }

  },
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
		.cartNumberBlock
			position relative
			height: 0.7rem;
			width: 1rem;
			line-height: 0.7rem;
			text-align: center;
			background: #000;
			color: #fff;
			border-radius: 0.14rem;
			.cartNumber
				display block
				position absolute
				top 0
				right 0
				width 0.25rem
				height 0.25rem
				border-radius 50%
				line-height 0.25rem
				text-align center
				background red;
				color #fff;
				font-size 0.1rem

	.center
		margin-top 0.92rem
</style>

