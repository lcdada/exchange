<template>
  <div class="addListCenter">
      <div class="addListText">
          <p class="addListText1">升级兑换区</p>
          <p class="addListText2">当前礼包+升级价格，即可兑换以下礼品</p>
      </div>
      <ul   class="allgoods">
          <li v-for="item in addlist" :key="item.id"  class="item_img">
              <router-link tag="div"  :to="{ path: '/detail', query: {id: item.goods_id,addgoods:'addgoods',pageName:item.package_name} }">
                    <div class="goods_img">
                        <img class="goods_picture" :src="item.thumb" alt="">
                    </div>
                    <div class="item_text">
                        <p class="text_1 text">{{item.goods_name}}</p>
                        <p class="text_2 text">{{item.salute_sketch}}</p>
                        <p class="text_3 text">+{{item.add_price | currency}}</p>
                    </div>
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import {currency} from '@/utils/currency'
export default {
    name:'AddList',
    data (){
        return {
            addlist:[]
        }

    },
     filters:{
		currency:currency
    },
    created() {
        let goodsList =JSON.parse(localStorage.getItem("addGoodsList")) 
        this.addlist = goodsList
    },
    methods: {
       
    },
    mounted() {
        
    },
}

</script>
<style lang='stylus' scoped>
@import '../../assets/styles/mixins.styl'
.addListCenter 
    background #fff
    .addListText
        padding-top 0.46rem
        padding-bottom 0.32rem
        display flex
        justify-content center
        flex-direction column
        align-items center
        .addListText1
            font-size:0.32rem;
            font-family:PingFang-SC;
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:0.44rem;
            letter-spacing 0.02rem
        .addListText2
            font size 0.28rem;
            font-family:PingFang-SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:0.4rem;
            margin-top 0.16rem;

    .allgoods
        display flex
        justify-content flex-start
        align-items center
        flex-wrap wrap
        background #fff
        .item_img
            width 50%;
            .item_text
                padding-top 0.1rem
                height 1.2rem
                line-height .4rem
                position relative
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

                .goods_name
                    font-weight 500
                    color #333
                    text-align center
                    ellipsis()
                .text_second
                    color #666
                    font-size 0.26rem
                .goods_pice
                    color #000
            .goods_img
                width 100%
                .goods_picture 
                    width 100%
</style>