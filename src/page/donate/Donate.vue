<template>
  <div class="donate">
      <div class="people_name">
		  <span class="inp_title">To：</span>
		  <input type="text" class="peoele_int" placeholder="请输入TA的称呼" v-model="addDonateLog.to_user">
      </div>
	  <div class="people_name">
		  <span class="inp_title">From：</span>
		  <input type="text" class="peoele_int" placeholder="请输入您的称呼" v-model="addDonateLog.from_user">
	  </div>
	  <div>
		  <textarea name="" id="" cols="30" rows="10" placeholder="送上祝福..." class="bless_text" v-model=" addDonateLog.bless_content"></textarea>
	  </div>
	  <div class="upLoader">
		  	<div class="uoLoader_item">
				<van-uploader
					v-model="fileList"
					multiple
					:max-count="1"
					:after-read="afterReadOne"
					@delete="afterDelte"
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
					@delete="afterDelte"
				/>
				<span>上传视频</span>
		  	</div>
	  </div>
	  <div class="loading" v-if="showLoading">
		  <van-loading type="spinner" color="#ea2000" vertical>正在上传中。。。</van-loading>
	  </div>
	  <div class="footer_text">
		  <p class="text_title">礼包转赠说明</p>
		  <p class="text_content">受赠用户只能凭 <span class="color_text">您输入的好友手机领取礼物</span> ，请谨慎填写！</p>
		  <!-- <p class="text_content">2.您还可以在微信公众号<span class="color_text">“礼物兑换中心”</span> 中使用礼包账号密码，对已转赠的礼包进行回收等操作。</p> -->
	  </div>
	  <van-tabbar fixed class="footer_btn">
		  <button class="fot_btn btn_one" @click="Preview">预览</button>
		  <button class="fot_btn btn_wto" @click="NowPreview">直接转赠</button>
	  </van-tabbar>
	  <van-popup
		v-model="showphome"
		lock-scroll:true
		class="showPreview"
		close-on-click-overlay:true
	  >
	  	   <van-icon name="cross"  class="close_uicon" size='20px' @click="close_icon"/>
		   <p class="from_title">请验证</p>
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入卡号" value="" class="inpt"  v-model="addDonateLog.account">
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入密码" value="" class="inpt"  v-model="addDonateLog.pwd">
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入受赠好友手机号" value="" class="inpt" v-model="addDonateLog.phone">
		   <button class="btn_affirm" @click="btn_affirm">确认提交</button>
		   <p class="tips">好友手机号领取礼物唯一凭证</p>
	  </van-popup>
	   <van-popup
		v-model="showphomeagain"
		lock-scroll:true
		class="showPreview"
		close-on-click-overlay:true>
	  	   <van-icon name="cross"  class="close_uicon" size='20px' @click="close_icon"/>
		   <p class="from_title">请验证</p>
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout"  value="" class="inpt"  v-model="from_mobile">
		   <div class="code_block">
			    <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入验证码" value=""   class="input_code" v-model="code">
				<button @click="getCode" v-if="!showCode">获取验证码</button>
              	<button @click="getCode" v-if="showCode">{{codeTime}}s后重新获取</button>
		   </div>
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入受赠好友手机号" value="" class="inpt" v-model="friend_phone">
		   <button class="btn_affirm" @click="btn_affirm">确认提交</button>
	  </van-popup>
  </div>
</template>

<script>
import utils from '../../utils/utils'
import { Uploader,Tabbar ,Popup,Icon,Loading ,Toast } from 'vant';
//  import VConsole from 'vconsole/dist/vconsole.min.js' ;
  
export default {
	data() {
		return {

			fileList: [],
			fileListTwo:[],
			showphome:false,
			showphomeagain:false,
			timer:null,
			// from_mobile:utils.getUrlKey('mobile'),
			from_mobile:"",
			addDonateLog:{
				from_user:'',
				to_user:'',
				bless_content:'',
				bless_pic:'',
				bless_video:'',
				package_id:'',
				account:'',
			},
			// jid : utils.getUrlKey('jid'),
			jid:utils.getUrlKey('jid'),
            package_id:utils.getUrlKey('package_id'),
            account:utils.getUrlKey('account'),
            donate_id:utils.getUrlKey('donate_id'),
            mobile:utils.getUrlKey('mobile'),
			donate_type:utils.getUrlKey('donate_type'),
			goods_id:utils.getUrlKey('id'),
			requestParam : {},
			phone_num:'',
			code:'',
			friend_phone:'',
            codeTime:0,
			showCode:false,
			showLoading:false

		}
	},
	components:{
		[Uploader.name]:Uploader,
		[Tabbar.name]:Tabbar,
		[Popup.name]:Popup,
		[Icon.name]:Icon,
		[Loading.name]:Loading,
		[Toast.name]:Toast
	},
	created() {
		localStorage.setItem('thumb',null);
		localStorage.setItem('video',null);
		// let vConsole = new VConsole() // 初始化
	},
	methods: {
		afterDelte(){
			this.showLoading  = false
			Toast('取消上传');
			localStorage.setItem('thumb',null);
			localStorage.setItem('video',null);
		},

		afterReadOne(){
			this.showLoading = true;
			const img = this.fileList[0].content
			const imgtype = this.fileList[0].file.type
			this.$api.home.UploadImg({
			   imgBase64:img,
			   mime:imgtype
            }).then(params => {
				// console.log(params)
                if(params.data.status  == 101){
					const preview_url = params.data.preview_url
					this.showLoading = false
					Toast('上传成功');
					localStorage.setItem('thumb',preview_url)

                }
            })
		},

		afterRead(){
			this.showLoading = true;
			const img = this.fileListTwo[0].content
			const imgtype = this.fileListTwo[0].file.type
			this.$api.home.UploadImg({
			   imgBase64:img,
			   mime:imgtype
            }).then(params => {
                if(params.data.status  == 101){
					// console.log(params)
					const preview_url = params.data.preview_url;
					this.showLoading = false;
					Toast('上传成功');
					localStorage.setItem('video',preview_url)
                }
            })
		},
		addDonate(callback){
			localStorage.setItem('to_user',this.addDonateLog.to_user);
			localStorage.setItem('from_user',this.addDonateLog.from_user);
			localStorage.setItem('theme_content',this.addDonateLog.bless_content);
			let jid = localStorage.getItem ('jid')
			let page_id = localStorage.getItem('package_id'+jid)
			let thumb = localStorage.getItem('thumb')
			let video =  localStorage.getItem('video')
			this.$api.home.DonateLog({
				from_user:this.addDonateLog.from_user,
				to_user:this.addDonateLog.to_user,
				bless_content:this.addDonateLog.bless_content,
				package_id:page_id,
				bless_pic:thumb,
				bless_video:video
			}).then(params => {
				callback(params);
			})
		},
		Preview(){
			
			let _that = this
			this.addDonate(function(params) {
				if(params.data.code == 1000){
					const donate_id = params.data.data
					_that.$router.push({path:'/preview','query':{"donate_id":donate_id}})
				}
			})
		},
		NowPreview(){
			if(this.donate_id) {
				this.showphomeagain = true
            }else{
				this.showphome = true
            }
		},
		getCode(){
			this.$api.home.getCode({

				mobile : this.from_mobile
            }).then(params => {
               if(params.data.code == 1000){
                    this.showCode = true,
                    this.codeTime = 60;
                    let codeTimeTimer =  setInterval(()=>{
                        this.codeTime--;
                        if(this.codeTime<=0){
                            this.showCode = false;
                            clearInterval(codeTimeTimer);
                        }
                    }, 1000);
                }
            })
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
			let that = this;

			this.addDonate(function(params) {
				if(params.data.code == 1000){
					const donate_id = params.data.data
					if(!that.donate_id) {
						let package_id = localStorage.getItem("package_id"+that.jid);
						that.requestParam = {
							account:that.addDonateLog.account,
							pwd:that.addDonateLog.pwd,
							from_mobile:that.addDonateLog.phone,
							package_id:package_id,
							jid:that.jid,
							donate_id:donate_id,
							from_user:that.addDonateLog.from_user,
							goods_id : that.goods_id
						}
					}else{
						that.requestParam = {
							from_mobile:that.from_mobile,
							code:that.code,
							to_mobile:that.friend_phone,
							package_id:(that.package_id === null || that.package_id == "null" || !that.package_id) ? "" : that.package_id,
							donate_id:donate_id,
							account:that.account,
							from_user:that.addDonateLog.from_user,
						}
					}
					that.$api.home.donateUser(that.requestParam).then(params => {
						if(params.data.code  == 1000){
							if(!that.donate_id){
								that.$router.push({path:'/donatesucc',
								'query':{
									"account":that.addDonateLog.account,
									"mobile":that.addDonateLog.phone,
									"name":that.addDonateLog.from_user,
									"donate_id":donate_id}
								})
							}else{
								that.$router.push({path:'/donatesucc',
								'query':{
									"account":that.addDonateLog.account,
									"mobile_again":that.friend_phone,
									"name":that.addDonateLog.from_user,
									"donateId":donate_id}
								})
							}
						}else{
							Toast(params.data.msg);
						}
					})
				}
			})
		},
		close_icon(){
		   this.showphome = false
		   this.showphomeagain =false
        }
	},
}

</script>
<style lang='stylus' scoped>
	.donate
		padding 0 0.32rem
		background #ffffff
		position relative
		.loading
			position: absolute;
			width 50%
			margin-right -25%
			top: 60%;
			right: 50%;
			background #fff
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
			.inpt,.code_block
				width 4.26rem
				height 0.6rem
				display block
				margin 0 auto
				margin-top 0.2rem
				border-bottom  0.04rem solid #333
			.code_block
				display flex
				justify-content space-between
				align-items center
				.input_code
					width 2rem
			.btn_affirm
				width 4.24rem
				height 0.8rem
				background #333
				color #ffffff
				display  block
				margin 0 auto
				margin-top 1.6rem
			.tips
				text-align center
				padding-top 0.2rem
 </style>
