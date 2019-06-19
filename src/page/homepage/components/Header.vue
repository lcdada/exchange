<template>
  <div>
        <div class="bless_video" controls="controls">
            <video
                :src="bless.video" 
                width="100%"
                height="100%"
                x5-video-player-fullscreen="true"
                x5-playsinline
                playsinline
                webkit-playsinline
                preload="auto"
                controls 
            >
            </video>
        </div>
      <div class="bless_text">
          <p class="from_name">Dear All</p>
          <p class="bless_content" v-html="bless.theme_content">{{bless.theme_content}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name:'HomeHeader',
     props:{
        bless:Object
    },
}

</script>
<style lang='stylus' scoped>
    .bless_video
        width 100%
        height 4.2rem
    .bless_text
        padding 0.16rem 0
        .from_name
            padding-bottom 0.2rem
            box-sizing border-box
        .bless_content
            color #666
            padding-bottom 0.2rem
            box-sizing border-box

</style>