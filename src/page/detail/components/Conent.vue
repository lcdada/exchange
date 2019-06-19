<template>
  <div>
      <div class="detail_text">
          <p class="goods_name">{{message.goods_name}}</p>
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
        text-align center
        height 2rem
        line-height 1rem
    .detail_conent
       padding-bottom 2rem

</style>