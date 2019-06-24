<template>
  <div>
      <div class="succ_top">
          <van-icon name="checked" />
          <p class="top_text">恭喜！ 兑换成功</p>
      </div>
      <div class="succ_text">
          <p class="succ_text_text">关注公众号，自动接收配送进度更新</p>
          <div class="qr_code">
               <img src="" alt="" class="qr_code_img">
          </div>
          <p class="p_num">订单编号：<span>4337433236787</span></p>
          <p class="p_num">礼品编号：<span>433743323</span></p>
          <p class="p_num">兑换时间：<span>2019-6-20</span></p>
      </div>
  </div>
</template>

<script>
import {Icon} from 'vant'
export default {
    name:'Succeed',
    components:{
        [Icon.name]:Icon
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