<template>
  <div>
      <div class="detail_text">
          <p class="goods_name">{{message.goods_name}}</p>
          <p class="name_second">精致细节，简约格调</p>
          <p class="price">¥9,500</p>
      </div>
      <div class="detail_conent" v-html='message.summary'>{{message.summary}}</div>
  </div>
</template>

<script>
export default {
    name:'DetailConent',
    props:{
        message:Object
    }

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
        .name_second
            color #666
            font-size 0.28rem
        .price
            font-size 0.32rem
            line-height auto
    .detail_conent
       padding-bottom 2rem

</style>