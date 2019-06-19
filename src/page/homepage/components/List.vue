<template>
  <div>
      <ul   class="allgoods">

       
          <li v-for="item in list" :key="item.id"  class="item_img">
              <router-link :to="{ path: '/detail', query: {id: item.id} }">
                    <div class="goods_img">
                        <img class="goods_picture" :src="item.around_thumb" alt="">
                    </div>
                    <div class="item_text">
                        <p class="goods_name">{{item.goods_name}}</p>
                        <p class="goods_name text_second">毛巾中的爱马仕</p>
                        <p class="goods_name goods_pice">￥2,000</p>
                    </div>
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'HomeList',
    props:{
        list:Array
    }
}

</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/mixins.styl'
.allgoods
    display flex
    justify-content flex-start
    align-items center
    flex-wrap wrap
    .item_img
        width 50%;
        .item_text
            padding-top 0.1rem
            height 1.2rem
            line-height .4rem
            position relative
            .item_text p
                text-align center
            .goods_name
                color #333
                text-align center
                ellipsis()
            .text_second
                color #666
            .goods_pice
                color #000
        .goods_img
            width 100%
            .goods_picture 
                width 100%
</style>