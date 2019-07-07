<template>
  <div>
     <div class="goods_list">
        <ul>
            <li  v-for="item in carData" :key="item.id" class="item">
            <div class="cart_goods">
                <div class="goods_img">
                    <img class="goods_picture" :src="item.picture" alt="">
                </div>
                <div class="item_text">
                    <p class="goods_name">{{item.goods_name}}</p>
                    <p class= "goods_title">{{item.title}}</p>
                    <p class="goods_num"> x{{ item.num }}</p>
                </div>
            </div>
            <van-icon name="cross" class="delete" @click="deleteFun(item)" />
            </li>
        </ul>
    </div> 
    <button class="go_exchange" @click="goExchange" v-if='!seenCartgoods'>去兑换</button>
    <div v-if='seenCartgoods'>
       <div class="empty_content">
            <p class="text1">购物袋</p>
            <p class="text2">购物袋为空 ,快去挑选吧!</p>
            <button class="goHomePage" @click="goHomePage">去逛逛</button>
        </div>
    </div>
  </div>
</template>

<script>
import {Icon} from 'vant'
export default {
    name:'ShopCart',
     data() {
        return {
            seenCartgoods:false
        }
    },
    components:{
        [Icon.name]:Icon
    },
    created(){
		if(this.count == 0){
            // console.log(this.count)
            // console.log(111)
            this.seenCartgoods= true
        }
	},
    computed: { 
        //购物车列表
        carData() {
            return this.$store.state.carList;
            console.log(this.$store.state.carList)
        },
        
        //商品总数
        count() {
            return this.$store.getters.carCount;
        }
     
    },
     methods: {
        // 增加数量
        addCar(data){
        this.$store.dispatch('addCar',data)
        },
        // 减数量
        reduceFun(data){
        this.$store.dispatch('reducedCar',data)
        },
        // 删除
        deleteFun(data){
            this.$store.dispatch('deleteCar',data)
            if(this.count == 1){
                // this.$router.go(-1)
                console.log(this.count)
                this.seenCartgoods= true
            }
        },
        goExchange(){
            this.$router.push({path:'/order'})
        },

        goHomePage(){
            this.$router.push({path:'/'})
        }
    }
}

</script>
<style lang='stylus' scoped>
@import '../../assets/styles/mixins.styl' 
    .goods_list 
        margin-top 0.16rem
        padding 0 0.2rem
        .item
            position relative
            height 3.72rem 
            padding 0.32rem
            box-sizing border-box
            display flex
            justify-content space-between
            align-items center
            background #fff
            margin-bottom 0.08rem
            .cart_goods
                display flex
                justify-content flex-start
                align-items center
                .goods_img
                    width 2.8rem
                    height 3.14rem
                    .goods_picture
                        width 100%
                        height 100%
                        display block
                .item_text
                    flex: 1;
                    margin-left: 0.32rem;
                    height: 3.14rem;
                    padding-top 0.18rem
                    position relative
                    .goods_name
                        font-size 0.28rem
                        color #333
                        font-weight 600
                        width 50%
                        ellipsis()
                    .goods_title
                        ellipsis()
                        font-size 0.28rem
                        color #666
                        padding-top 0.2rem
                    .goods_num
                        position absolute
                        bottom 0
                        left 0
        .delete
            position absolute
            top 0.2rem
            right 0.2rem
.go_exchange
    width 4.38rem
    height 0.92rem
    border-radius 0.08rem
    display block
    margin 0 auto
    margin-top 0.48rem
    background #000
    color #fff
.empty_content
        display flex
        flex-direction column
        align-items center
        padding-top 0.3rem
        .text1
            font-size 0.28rem
            line-height 0.44rem
            font-weight 600
            color #000
        .text2
            color #333
            line-height 0.4rem
            margin-top 0.1rem
        .goHomePage
            width 90%
            height 0.92rem
            background #000
            color #fff
            border-radius 0.08rem
            margin-top 0.6rem
</style>