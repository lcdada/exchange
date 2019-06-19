<template>
    <div class="header">
      <div class="header-left">
          <div class="iconfont back-icon">&#xe624;</div>
      </div>
      <div class="header-input">
          <span class="iconfont">&#xe632;</span>
          干嘛呢/你在想啥呢/啊？</div>
      <router-link to="/city">
        <div class="header-right">{{this.city}}
            <span class="iconfont">&#xe6aa;</span>
        </div>
      </router-link>
    </div>
</template>
<script>
export default {</script>
    name:'HomeHeader',
    props:{
        city:String
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/styles/varibles.styl'
    .header
       display:flex
       height:.86rem
       background:$bgColor
       color:#fff
       line-height:.86rem
       .header-left
            width:.64rem
            float:left
            .back-icon
                text-align:center
                font-size:.4rem 
        .header-input
            flex:1
            color:#ccc
            line-height:.64rem
            height:.64rem
            margin-left:.2rem
            margin-top:.12rem
            padding-left:.2rem
            background:#fff;
            border-radius:.1rem
        .header-right
            width:1.24rem
            float:right
            text-align:center
            color #ffffff
            

</style>
