<template>
  <div>
      <div class="succ_top">
          <div class="succ_top_div">
               <van-icon name="checked" size="36px" color="#1afa29"/>
               <p class="top_text">恭喜您,礼品兑换成功</p>
          </div>
          <p>我们会快马加鞭，将心爱的礼品尽快送达。</p>
      </div>
      <div class="order_mesg">
          <p class="p_num"><span class="span1">订单编号：</span><span class="span2">{{ order_sn }}</span></p>
          <p class="p_num"><span class="span1">收件信息：</span><span class="span2">{{userInfo}}</span></p>
          <p class="p_num"><span class="span1">收件地址：</span><span class="span2">{{detailInfo}}</span></p>    
      </div>
      <div class="succ_text_block">
          <p class="succ_text_text">物流信息追踪、找回丢失礼册订单信息，请关注下面公众号</p>
          <div class="arrow_block">
               <img src="./../../assets/img/arrowNew.png" alt="" class="arrowImg">
          </div>
          <div class="qr_code">
              <img :src="qrcode" alt="" class="qr_code_img">
              <p class="qr_code_text">长按二维码关注</p>
          </div>
      </div>
     
  </div>
</template>

<script>
import {Icon} from 'vant'
import utils from '../../utils/utils'

export default {
    name:'Succeed',
    components:{
        [Icon.name]:Icon
    },
    data() {
        return {
            order_sn: utils.getUrlKey('order_sn'),
            qrcode : '',
            userInfo:'',
            detailInfo:'',
        }
    },
     created(){
         let address = JSON.parse(localStorage.getItem("addressInfo")) ;
         console.log(address)
         this.userInfo = address.userName + "  " +address.telNumber;
         this.detailInfo = address.provinceName+address.cityName+address.countryName+address.detailInfo
     },
    mounted() {
        this.$api.home.getParamsCode({
            order_id : this.order_sn
        }).then(params => {
            this.qrcode = params.data.data;
        })
    }
}
</script>
<style lang='stylus' scoped> 
   
    .succ_top
        height 1.82rem
        display: flex;
        justify-content: center;
        flex-wrap wrap
        align-items: center;
        background #fff
        padding-bottom 0.4rem
        .succ_top_div
            display flex
            align-items center
        .top_text
            margin-left 0.3rem
    .order_mesg
        min-height 2rem
        padding 0.4rem 0.2rem
        display flex
        flex-wrap wrap
        align-items center
        .p_num
            width 100%
            line-height 0.3rem
            display flex
            justify-content flex-start
            .span1
                width 1.5rem
            .span2
                flex 1
    .succ_text_block
        background #fff
        padding-top 0.4rem
        padding-bottom 2rem
        .succ_text_text
            width 100%
            text-align center
            font-size 0.26rem
            font-weight 500
        .arrow_block
            width 50%
            margin 0 auto
            margin-top 0.4rem
            .arrowImg
                width 100%
        .qr_code
            width 3rem
            height 3rem
            margin 0 auto
            background: linear-gradient(#ae0000, #ae0000) left top,
            linear-gradient(#ae0000, #ae0000) left top,
            linear-gradient(#ae0000, #ae0000) right top,
            linear-gradient(#ae0000, #ae0000) right top,
            linear-gradient(#ae0000, #ae0000) right bottom,
            linear-gradient(#ae0000, #ae0000) right bottom,
            linear-gradient(#ae0000, #ae0000) left bottom,
            linear-gradient(#ae0000, #ae0000) left bottom;
            background-repeat: no-repeat;
            background-size: 1px 20px, 20px 1px;
            margin-top 0.4rem
            .qr_code_img
                width 2.7rem
                height 2.7rem
                margin-top: 0.12rem;
                margin-left:0.12rem;
            .qr_code_text
                text-align center
                font-size 0.24rem
        
</style>