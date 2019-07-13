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
					:after-read="afterReadOne"
				/>
				<span>上传图片</span>
		  	</div>
			<div class="uoLoader_item  uoLoader_item_two">
				<van-uploader
					v-model="fileListTwo"
					multiple
					:max-count="1"
					accept = "video/mp4"
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
		  <button class="fot_btn btn_wto" @click="NowPreview">直接转增</button>
	  </van-tabbar>  
	  <van-popup 
		v-model="showphome"
		lock-scroll:true
		class="showPreview"
		close-on-click-overlay:true
	  >
	  	   <van-icon name="cross"  class="close_uicon" size='20px' @click="close_icon"/>
		   <p class="from_title">请验证</p>
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入卡号" value="" class="inpt"  v-model="account">
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入密码" value="" class="inpt"  v-model="pwd">
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入好友手机号" value="" class="inpt" v-model="phone">
		   <button class="btn_affirm" @click="btn_affirm">确认提交</button>
	  </van-popup>	
  </div>
</template>

<script>
import { Uploader,Tabbar ,Popup,Icon } from 'vant';
export default {
	data() {
		return {
			to:'',
			from:'',
			bless_text:'',
			fileList: [],
			fileListTwo:[],
			showphome:false,
			timer:null,
			preview_url:'',
			preview_url_video:'',
			addDonateLog:{
				from_user:'',
				to_user:'',
				bless_content:'',
				bless_pic:'',
				bless_video:'',
				package_id:'',
				account:'',
			},
			donateUser:{
				accoun:'',
				pwd:'',
				from_mobile:'',
				to_mobile:'',
				donate_id:'',
				package_id:'',
				jid:'',
				code:'',
				phone:''
			}
			
		}
	},
	components:{
		[Uploader.name]:Uploader,
		[Tabbar.name]:Tabbar,
		[Popup.name]:Popup,
		[Icon.name]:Icon
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
					const preview_url = params.data.data.preview_url
					this.preview_url_video = preview_url
					console.log(this.preview_url)
					localStorage.setItem('video',this.preview_url)
                }
            })
			
		},
		afterReadOne(){
			const img = this.fileList[0].content
			const imgtype = this.fileList[0].file.type
			this.$api.home.UploadImg({
			   imgBase64:img,
			   mime:imgtype
            }).then(params => {
                if(params.data.code  == 1000){
					console.log(params);
					const preview_url = params.data.data.preview_url
					this.preview_url = preview_url
					console.log(this.preview_url)
					localStorage.setItem('thumb',this.preview_url)
                }
            })
		},
		Preview(){
			
			localStorage.setItem('to_user',this.to);
			localStorage.setItem('from_user',this.from);
			localStorage.setItem('theme_content',this.bless_text);
			let jid = localStorage.getItem ('jid')
			let page_id = localStorage.getItem('package_id'+jid)
			this.$api.home.DonateLog({
			  	from_user:this.addDonateLog.from_user,
				to_user:this.addDonateLog.to_user,
				bless_content:this.addDonateLog.bless_content,
				bless_pic:this.preview_url,
				bless_video:this.preview_url_video,
				package_id:page_id,
            }).then(params => {
                if(params.data.code  == 1000){
					console.log(params);
					const preview_url = params.data.data.preview_url
					this.preview_url = preview_url
					console.log(this.preview_url)
					localStorage.setItem('thumb',this.preview_url)
                }
            })
			
			// return false
			this.$router.push({path:'/preview'})
		},
		NowPreview(){
			this.showphome = true
		},
		 inputFocus(){
            clearTimeout(this.timer)
        },
        inputFocusout() {
            this.timer = setTimeout(() => {
            window.scrollTo(0,0)
            // 间隔设为10，减少页面失去焦点定时器的突兀感，
            },10)
        },
        destroyed() {
            clearTimeout(this.timer)
		},
		btn_affirm(){
			this.$api.home.donateUser({
				accoun:this.donateUser.accoun,
				pwd:this.donateUser.pwd,
				from_mobile:this.donateUser.from_mobile,
				to_mobile:this.donateUser.to_mobile,
				donate_id:'',
				package_id:'',
				jid:'',
				code:''

            }).then(params => {
                if(params.data.code  == 1000){
					console.log(params);
					
                }
            })
		},
		close_icon(){
           this.showphome = false 
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
				height 99%
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
		.showPreview
			width 70%
			height 6rem
			background #fff
			border-radius 0.16rem 
			padding  0.56rem
			.close_uicon
				position absolute
				top 0.2rem
				right 0.2rem
			.from_title
				line-height 0.44rem
				font-size 0.32rem
				text-align  center
				color #333
			.inpt
				width 4.26rem
				height 0.6rem
				display block
				margin 0 auto
				margin-top 0.2rem
				border-bottom  0.04rem solid #333
			.btn_affirm
				width 4.24rem
				height 0.8rem
				background #333
				color #ffffff
				display  block
				margin 0 auto
				margin-top 1.6rem

 </style>