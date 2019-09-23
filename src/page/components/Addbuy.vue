<template>
  <div class="addContent">
      <div class="add_title">
          <p class="add_title1">升级兑换区</p>
          <p class="add_title2">当前礼包+升级价格，即可兑换以下礼品</p>
          <span class="add_title3" @click="goAddPage(mid)">查看更多</span>
      </div>
      <div class="swiper_content">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in addlist" :key="item.id" @click.stop>
                <div @click="gourl(item)">
                    <div class=" item_img">
                        <img :src="item.thumb" alt="" class="itemImg">
                    </div>
                    <div class="itemText">
                        <p class="text_1 text">{{item.goods_name}}</p>
                        <p class="text_2 text">{{item.salute_sketch}}</p>
                        <p class="text_3 text">+{{item.add_price | currency}}</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
      </div>
     
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {Swipe, SwipeSlide } from 'vue-awesome-swiper'
import {currency} from '@/utils/currency'

export default {
    name: "AddBuy",
   props:{
            addlist:Array,
            package:String,
            mid:String
        },
    data(){
        return{
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            } ,
            goodsId:""
        }
    },
    filters:{
		currency:currency
    },
    watch: {
        addlist(val){
             localStorage.setItem("addGoodsList",JSON.stringify(val))

        },

    },
    components:{
		Swipe,   
        SwipeSlide,
    },
    methods: {
        goAddPage(data){
            this.$router.push({ path: "/addlist",query:{addPriceId:data}})
        },
        gourl(data){
            this.$router.push({ path: '/detail', query: {id: data.goods_id,addgoods:"addgoods",pageName:data.package_name,addPriceId:data.mid,package_id:this.package,} })
           localStorage.setItem("mid",data.mid)

        }


    },
    
};
</script>
<style lang='stylus' scoped>
    @import '../../assets/styles/mixins.styl'
    .addContent
        // padding-bottom :2rem
    .swiper_content
        height 5.2rem
    .add_title
        display:flex;
        justify-content:center;
        flex-direction: column;
        align-items: center;
        border-top:0.01rem solid #ccc;
        padding-top :0.54rem;
        .add_title1
            font-size:0.34rem;
            font-weight:600;
            font-family:PingFangSC;
            color:rgba(0,0,0,1);
            line-height:0.44rem;
        .add_title2
            font-size:0.28rem;
            font-family:PingFangSC;
            color:#666;
            line-height:0.4rem;
            margin-top 0.18rem
        .add_title3
            font-size:0.28rem;
            font-family:PingFangSC;
            color:#666;
            line-height:0.4rem;
            margin-top: 0.22rem;
            position :relative;
            display :block

        .add_title3::after
            display: inline-block;
            content: " ";
            height: 0.1rem;
            width: 0.1rem;
            border-width: 0.03rem 0.03rem 0 0;
            border-color: #666;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform-origin: center;
            position: absolute;
            top: 46%;
            right: -0.2rem;
            margin-top: -0.04rem;
    .swiper-slide 
        width:2.6rem;
        .item_img
            width 2.6rem
            height 2.9rem
        .itemImg
            width 100%
            display block
        .text
            text-align center
            line-height 0.4rem
            font-size 0.28rem 
            ellipsis()
        .text_1
            color #333
            font-weight bold
        .text_2
            color #666 
        .text_3
            color #000
            letter-spacing 0.02rem

    </style>