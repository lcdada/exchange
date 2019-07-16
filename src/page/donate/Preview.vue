<template>
  <div>
      <div class="bless_div_img">
          <img :src= thumb alt="" class="bless_img">
      </div>
      <div class="bless_div_video">
          <video class="video" style="padding: 0px;" autoplay="autoplay" controls="controls" webkit-playsinline="" width="100%" height="100%" >
              <source id="video" :src=video >
          </video>
        
      </div>
      <div class="bless_conent">
          <p class="to" >{{to_user}}</p>
          <p class="text">{{theme_content}}</p>
          <p class="from">{{from_user}}</p>
      </div>
      <home :package="package_id" :list="goods_list" :bless="bless_info" :flag="flag"></home>
      <van-tabbar fixed class="footer_btn">
		  
		  <button class="fot_btn " @click="NowPreview">确认转增</button>
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
		   <input type="text" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入好友手机号" value="" class="inpt" v-model="addDonateLog.phone">
		   <button class="btn_affirm" @click="btn_affirm">确认提交</button>
	  </van-popup>	  
  </div>
</template>

<script>

import Home from './../homepage/Home'
import { Uploader,Tabbar ,Popup,Icon  } from 'vant';
export default {
    name:'Preview',
    components:{
        Home,
        [Uploader.name]:Uploader,
		[Tabbar.name]:Tabbar,
        [Popup.name]:Popup ,
        [Icon.name]:Icon 
    },
    data() {
        return {
            to_user:'',
            from_user:'',
            thumb:'',
            video:'',
            theme_content:'',
            bless_info:{},
            goods_list:[],
            exchange_num:'',
            package_id:'',
            flag:false,
            showphome:false,
            addDonateLog:{
				from_user:'',
				to_user:'',
				bless_content:'',
				bless_pic:'',
				bless_video:'',
				package_id:'',
				account:'',
			},
        }
    },
    created() {
        const to_user = localStorage.getItem("to_user")
        const from_user = localStorage.getItem("from_user")
        const theme_content = localStorage.getItem("theme_content")
        const thumb = localStorage.getItem("thumb")
        const video  = localStorage.getItem("video")
        this.to_user = to_user,
        this.from_user = from_user,
        this.theme_content = theme_content,
        this.thumb = thumb,
        this.video = video,
        console.log(video );
        
        
    },
    methods:{
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
        NowPreview(){
            this.showphome = true 
        },
        btn_affirm(){
            let donate_id = localStorage.getItem('donate_id');
			let jid = localStorage.getItem ('jid');
			let page_id = localStorage.getItem('package_id'+jid);
			this.$api.home.donateUser({
				account:this.addDonateLog.account,
				pwd:this.addDonateLog.pwd,
				from_mobile:this.addDonateLog.phone,
				package_id:page_id,
				jid:jid,
				donate_id:donate_id

            }).then(params => {
                if(params.data.code  == 1000){
					// console.log(params);
                    this.showphome = false
                    this.$router.push({path:'/donatesucc.vue'})
                }
            })
        },
        close_icon(){
           this.showphome = false 
        }

    }   
}

</script>
<style lang='stylus' scoped>
    .bless_div_img
        width 100%
        .bless_img
            width 100%
    .bless_div_video
        margin-top 0.3rem
           
    .bless_conent
        background #ffffff
        padding 0 0.2rem
        .to
            padding-top 0.3rem
            font-size 0.32rem
            color #333
            font-weight 600
        .text
            padding 0.3rem
            font-size 0.28rem
            line-height 0.4rem

        .from
            line-height  0.44rem
            text-align right 
    .fot_btn
        width 80%
        background #333
        color #fff
        margin 0 auto 
    .showPreview
        width 70%
        height 6rem
        background #fff
        border-radius 0.16rem 
        padding  0.56rem
        // position relative
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