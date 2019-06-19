<template>
    <div>
        <detail-banner :Spics="Swiperpics"></detail-banner>
        <detail-conent :message='Msessage'></detail-conent>
        <van-tabbar fixed  v-model="active" class="active_tab">
            <!-- <van-tabbar-item class="add btn">加入购物袋</van-tabbar-item>
            <van-tabbar-item class="buy_goods btn">立即购买</van-tabbar-item> -->
            
            <div>
                
                
            </div>
        </van-tabbar>
    </div>
</template>
<script>
import DetailBanner from './components/Banner'
import DetailConent from './components/Conent'
import {  Tabbar, TabbarItem } from 'vant';
export default {
    name:'Detail',
    data (){
        return {
            Swiperpics:[],
            Msessage:{}
        }
    },
    components:{
        DetailBanner,
        DetailConent,
         [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    },
    methods:{
         init () {
            let id = this.$route.query.id
            this.$api.home.getGoodsDetail({
                goods_id:id
            }).then(params =>{
                 if(params.data.code  == 1000){
                        const data = params.data.data[0];
                        console.log(data)
                        this.Swiperpics = data.pics
                        this.Msessage =data

                    }
            })
        },
        // getDetail(){
        //     this.$api.home.getGoodsDetail({
        //         goods_id:id
        //     }).then(params =>{
        //          if(params.data.code  == 1000){
        //                 const data = params.data.data[0];
        //                 console.log(data)
        //                 this.Swiperpics = data.pics
        //                 this.Msessage =data

        //             }
        //     })
        // }
    },
    mounted () {
        this.init()
       
    },  
}
</script>
<style lang="stylus" scoped>
    .btn
        height 0.4rem
        width  1.62rem

</style>
