<template>
  <div>
      <div class="succ_top">
          <van-icon name="checked" size="20px"/>
          <p class="top_text">恭喜！ 转增成功</p>
      </div>
      <div class="succ_text">
          <p class="succ_text_text">长按二维码，关注了解更多商品</p>
          <div class="qr_code">
               <img src="./../../assets/img/qrcode.jpg" alt="" class="qr_code_img">
          </div>
      </div>
  </div>
</template>

<script>
import {Icon} from 'vant'
import utils from '../../utils/utils'

export default {
    name:'DonateSucc',
    components:{
        [Icon.name]:Icon
    },
    data() {
        return {
            jid:utils.getUrlKey('jid'),
        }
    },
    methods:{
        donate(){
            if(this.jid === 929){
            wx.ready(function () {
                console.log(888888)
                var sharedata = {
                    title: title,
                    desc: desc,
                    link: window.location.href+"&donate_type=1"+"&action=around",
                    imgUrl: imgUrl ? imgUrl : "",
                    success: function(){

                    },
                    cancel: function(){

                    }
                };

                wx.onMenuShareAppMessage(sharedata);
                //peng you quan
                wx.onMenuShareTimeline(sharedata);

            });
        }
        }
        
      
    },
    mounted() {
       this.donate() 
    }
}
</script>
<style lang='stylus' scoped> 
    .succ_top
        height 1.82rem
        display: flex;
        justify-content: center;
        align-items: center;
        .top_text
            margin-left 0.3rem
    .succ_text
        display flex
        justify-content center
        flex-direction: column;
        align-items: center;
        background #fff
        padding 1.28rem 1rem 2.8rem 1rem 
        .succ_text_text
            font-size 0.32rem
            font-weight 500
        .qr_code
            width 2.92rem
            height 2.92rem
            margin-top 0.3rem
            margin-bottom 0.48rem
            background #ccc
            .qr_code_img
                width 100%
                height 100%
                display block
        .p_num
            line-height 0.6rem

</style>