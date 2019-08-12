<template>
  <div>
      <div class="detail_text">
          <p class="serialNum">{{message.goods_sn}}</p>
          <p class="goods_name">{{message.goods_name}}</p>
          <p class="name_second">{{message.salute_sketch}}</p>
      </div>
      <div class="detail_conent" v-html='message.summary'>{{message.summary}}</div>
        <van-tabbar class="footer">
            <div v-if="show_button_two" class="footer">
                <div  class="footer_btn"  v-if="show_addcart">
                    <button class="btn addcart"  @click="addCart(message)">加入购物车</button>
                    <button class="btn buynow" @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
                </div>
                <div  class="footer_btn"  v-if="!show_addcart">
                    <button class="btn buynow nowButton" @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
                </div>
            </div>
            <div v-if="arrival_time" class="footer">
                <div  class="footer_btn"  v-if="arrival_time_text">
                    <button class="btn buynow nowButton" >{{message.start_time}}到货</button>
                </div>
                <div  class="footer_btn"  v-if="sold_out">
                    <button class="btn buynow nowButton" >{{message_text}}</button>
                </div>
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
        message:Object,
        flag:Boolean,
    },
    data(){
        return{
           CartList:[],
           show_addcart:true,
           source :utils.getUrlKey('source'),
           show_button_two:true,
           arrival_time:false,
           message_text:"该商品已下架",
           arrival_time_text:false,
           sold_out:false,
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
    watch: {
        message:function(value){
            let valueData = value;
            let d = JSON.stringify(valueData)
            let b = (JSON.stringify(valueData) == "{}");
            if(b == false){
                this.showTime()
            }
        }
    },
   
    methods: {
        addCart(params){
            // console.log(params)
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
            if(this.flag == false){
                 return false;
            }else{
                this.$router.push({path:'/order',query: {goods_id: params.id,now:true} })
            }
           
        },
        showTime(){
            if (this.message.goods_stat != "1" ) {
                this.show_button_two = false;
                this.arrival_time = true;
                this.sold_out = true 
                return false;
            }
            if (!this.message.is_start) {
                this.show_button_two = false;
                this.arrival_time = true;
                this.arrival_time_text = true;
        
                
            }
           
        }
    },
    mounted(){
        // this.showTime()
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
        width 100%
        box-sizing border-box
        .footer_btn
            height 1.24rem
            width 100%
            display flex
            justify-content space-between
            align-items center
            padding 0 0.4rem
            box-sizing border-box
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