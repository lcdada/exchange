<template>
    <div>
        <div class="top_banner" v-if="videoDetail">
            <van-swipe :autoplay="3000" class="swiper_item" @change="onChange">
                <van-swipe-item v-for="item in Spics" :key="item.id" >
                    <img :src="item" class="swiper_item_img"/>
                </van-swipe-item>
                <div class="custom-indicator" slot="indicator" indicator-color="white">
                    {{ current + 1 }}/{{Spics.length}}
                </div>
            </van-swipe>
            <div class="video_btn" v-if="video_time" @click="showVideo">
                <div class="time_icon">
                    <img src="@/assets/img/play_icon.png" alt="" class="video_btn_img">
                    
                    <!-- <span class="video_timer">{{message.video_time}}</span> -->
                </div>
            </div>
        </div>
        <div class="video_detail" v-if="!videoDetail">
            <video
                :src="message.video"
                ref="video"
                width="100%"
                height="100%"
                x5-video-player-fullscreen="true"
                x5-playsinline
                playsinline
                webkit-playsinline
                preload="auto"
                autoplay='true'
                controls
                object-fit = fill
            >
            </video>
            <img src="@/assets/img/close_video_icon.png" alt=""  class="close_video"  @click="close_video">
        </div>
    </div>
</template>
<script>
    import {Swipe, SwipeItem,Lazyload } from 'vant'
    export default {
        name:'DetailBanner',
        props:{
            Spics:Array,
            message:Object
        },
        components:{
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem,
            [Lazyload.name]:Lazyload
        },
        data() {
            return {
                current: 0,
                videoDetail:true,
                video_time:false
            }
        },
       
        watch: {
            
            message:function(value){
                this.video_time = false;
                let valueData = value.video;
                if(valueData != "" || valueData != undefined){
                    this.showVideoTime()
                }
            }
        },
        methods: {
            onChange(index) {
                this.current = index;
            },
            showVideo(){
                this.videoDetail = false
            },
            close_video(){
                this.videoDetail = true
            },
            showVideoTime(){
                if(this.message.video != ""){
                    this.video_time = true 
                }
            }
           
        },
        mounted(){
        }
       
    }
</script>
<style lang="stylus" scoped>
    .top_banner
        position relative
        .swiper_item
            width 100%
            height  8.4rem
            .swiper_item_img
                width 100%
                height 100%
        .custom-indicator
            position absolute
            bottom 0.2rem
            right 0.3rem
            color #666
        .video_btn
            // display none 
            width 1.56rem
            height 0.56rem
            border-radius 0.28rem
            // background rgba(0,0,0,0.31)
            position absolute
            bottom 0.2rem
            left 50%
            margin-left -0.78rem
            z-index 99
            .time_icon
                height 100%
                display flex
                justify-content center
                align-items center
                padding 0 0.15rem 0 0.1rem
            .video_btn_img
                width 0.4rem
                height 0.4rem
    .video_detail
        width 100%
        height 8.4rem
        position relative
        background #000
        .close_video
            position absolute
            top 0.3rem
            left 0.2rem
            display block
            width 0.4rem
            height 0.4rem

</style>
