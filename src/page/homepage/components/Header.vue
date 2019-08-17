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
                :poster="bless.cover_map" 
                object-fit = fill
            >
            </video>
        </div>
      <div class="bless_text">
          <p class="to_name" v-html="bless.to_user"></p>
          <p class="bless_content" v-html="bless.theme_content"></p>
          <p class="from_name" v-html="bless.from_user"></p>

      </div>
  </div>
</template>

<script>
export default {
    name:'HomeHeader',
     props:{
        bless:Object,
        title:String
    },
    
    updated() {
        
    },
    methods: {
        title_text(){
            /*localStorage.setItem("title",this.title.title)
            this.title = localStorage.getItem('title')*/
        }
        
    },
    mounted() {
        this.title_text()
    },
}

</script>
<style lang='stylus' scoped>
    .bless_video
        width 100%
        height 4.2rem
    .bless_text
        padding 0.16rem 0
        .to_name
            padding-bottom 0.2rem
            box-sizing border-box
        .from_name
            padding-bottom 0.2rem
            box-sizing border-box
            text-align right 
        .bless_content
            color #666
            padding-bottom 0.2rem
            box-sizing border-box

</style>