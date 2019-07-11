<template>
    <div>
        <van-swipe :autoplay="3000" class="swiper_item">
            <van-swipe-item v-for="item in Spics" :key="item.id" >
                <img :src="item" class="swiper_item_img"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import {Swipe, SwipeItem,Lazyload } from 'vant'
export default {
    name:'DetailBanner',
    props:{
        Spics:Array
    },
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Lazyload.name]:Lazyload 
    },
    data() {
        return {
            
        }
    }
}
</script>
<style lang="stylus" scoped>
    .swiper_item
        width 100%
        height  8.4rem
        .swiper_item_img
            width 100%
            height 100%
</style>
