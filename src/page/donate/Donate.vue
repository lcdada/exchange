<template>
  <div class="donate">
      <div class="people_name">
		  <span class="inp_title">To：</span>
		  <input type="text" class="peoele_int" placeholder="请输入TA的称呼" v-model="to">
      </div>
	  <div class="people_name">
		  <span class="inp_title">From：</span>
		  <input type="text" class="peoele_int" placeholder="请输入您的称呼" v-model="from">
	  </div>
	  <div>
		  <textarea name="" id="" cols="30" rows="10" placeholder="送上祝福..." class="bless_text" v-model="bless_text"></textarea>
	  </div>
	  <div class="upLoader">
		  	<div class="uoLoader_item">
				<van-uploader
					v-model="fileList"
					multiple
					:max-count="1"
				/>
				<span>上传图片</span>
		  	</div>
			<div class="uoLoader_item  uoLoader_item_two">
				<van-uploader
					v-model="fileListTwo"
					multiple
					:max-count="1"
					:after-read="afterRead"
				/>
				<span>上传视频</span>
		  	</div>
	  </div>
	  <div class="footer_text">
		  <p class="text_title">礼包转增说明</p>
		  <p class="text_content">1.受赠用户只能凭 <span class="color_text">您输入的好友手机领取礼物</span> ，请谨慎填写！</p>
		  <p class="text_content">2.您还可以在微信公众号<span class="color_text">“礼物兑换中心”</span> 中使用礼包账号密码，对已转增的礼包进行回收等操作。</p>
	  </div>
	  <van-tabbar fixed class="footer_btn">
		  <button class="fot_btn btn_one" @click="Preview">预览</button>
		  <button class="fot_btn btn_wto">直接转增</button>
	  </van-tabbar>  
  </div>
</template>

<script>
import { Uploader,Tabbar } from 'vant';
export default {
	data() {
		return {
			to:'',
			from:'',
			bless_text:'',
			fileList: [],
			fileListTwo:[]
		}
	},
	components:{
		[Uploader.name]:Uploader,
		[Tabbar.name]:Tabbar
	},
	methods: {
		afterRead(){
			const img = this.fileListTwo[0].content
			const imgtype = this.fileListTwo[0].file.type
			this.$api.home.UploadImg({
			   imgBase64:img,
			   mime:imgtype
            }).then(params => {
                if(params.data.code  == 1000){
					console.log(params);
					
                }
            })
			
		},
		Preview(){
			localStorage.setItem('to_user',this.to);
			localStorage.setItem('from_user',this.from);
			localStorage.setItem('thumb',this.fileList);
			localStorage.setItem('video',this.fileListTwo);
			localStorage.setItem('theme_content',this.bless_text);
			
			
			return false
			this.$router.push({path:'/preview'})
		}
	},
}

</script>
<style lang='stylus' scoped>
	.donate
		padding 0 0.32rem
		background #ffffff
		.people_name
			height 1.1rem
			display flex
			justify-content flex-start
			align-items  center
			border-bottom  0.01rem solid #eee
			.peoele_int
				flex 1
				height 100%
				margin-left 0.5rem
			.inp_title
				display block
				width 1rem
				font-size 0.32rem
				font-weight 600
		.bless_text
			width 100%
			height 2.6rem
			padding 0.2rem  0
		.upLoader
			display flex
			justify-content flex-start
			align-items center
			.uoLoader_item
				display  flex
				flex-direction column
			.uoLoader_item_two
				margin-left 0.5rem
		.footer_text
			margin-top 1.5rem
			padding-bottom 2rem
			.text_title
				font-size 0.28rem
				line-height 0.44rem
			.text_content
				margin-top 0.16rem
				font-size 0.24rem
				line-height 0.4rem
				.color_text
					color #ea2000
		.footer_btn
			display flex
			justify-content space-between
			align-items center 
			padding 0 0.32rem
			box-sizing border-box
			.fot_btn
				width 48%
				height 100%
			.btn_one
				color #fff
				background #333
			.btn_wto
				background #fff
				color #333
				border 0.01rem solid #000	 
				
 </style>