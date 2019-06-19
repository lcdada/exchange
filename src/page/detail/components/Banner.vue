<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in Spics" :key="item.id" class="swiper_item">
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
    .swiper_item_img
        width 100%
</style>
