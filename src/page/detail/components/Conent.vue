<template>
  <div>
      <div class="detail_text">
          <p class="serialNum">{{message.goods_sn}}</p>
          <p class="goods_name">{{message.goods_name}}</p>
          <p class="name_second">{{message.salute_sketch}}</p>
      </div>
      <div class="detail_conent" v-html='message.summary'>{{message.summary}}</div>
        <van-tabbar class="footer">
            <div  class="footer_btn"  v-if="show_addcart">
                <button class="btn addcart"  @click="addCart(message)">加入购物车</button>
                <button class="btn buynow" @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
            </div>
            <div  class="footer_btn"  v-if="!show_addcart">
                <button class="btn buynow nowButton" @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
            </div>
        </van-tabbar>
  </div>
</template>

<script>
import utils from '../../../utils/utils'
import {  Tabbar, Toast  } from 'vant';
export default {
    name:'DetailConent',
    props:{
        message:Object
    },
    data(){
        return{
           CartList:[],
           show_addcart:true,
           source :utils.getUrlKey('source'),
        }
    },
    components:{
         [Tabbar.name]:Tabbar,
         [Toast.name]:Toast 
    },
    created(){
        if(this.source || this.source == 'goods_qrcode'){
            this.show_addcart = false;
        }
    },
    methods: {
        addCart(params){
            console.log(params)
            this.$store.dispatch('addCar',params);
            Toast.success('加入购物车');
            // const goodsDetial = {
            //     picture:params.thumb,
            //     goods_name:params.goods_name,
            //     title:params.class_name,
            //     num:1
            // }
            
            // const goodsList = localStorage.setItem('CartList',JSON.stringify(goodsDetial))
            // console.log(goodsList)
        },
        buyNow(params){
            this.$store.dispatch('nowAddCar',params);
            this.$router.push({path:'/order',query: {goods_id: params.id,now:true} })
        }
    },

}

</script>
<style lang='stylus' scoped>
    .detail_text
        padding-top 0.16rem
        text-align center
        line-height 0.5rem
        padding-bottom 1.08rem
        .goods_name
            font-size 0.32rem
            font-weight 600
            line-height auto
            padding  0 0.4rem
        .name_second,.serialNum
            color #666
            font-size 0.28rem
    .detail_conent
       padding-bottom 2rem
    .footer
        height 1.24rem
        .footer_btn
            height 1.24rem
            width 100%
            display flex
            justify-content space-between
            align-items center
            padding 0 0.4rem
            .btn
                width 48%
                height 0.8rem
                border 1px solid #000
                border-radius 0.08rem
            .addcart
                background #000
                color #fff
                font-size 0.28rem
            .buynow
                background #fff
                color #000
                font-weight 600
                font-size 0.28rem
            .nowButton
                width  100%

</style>