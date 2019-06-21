<template>
  <div>
    <div>
      <ul>
        <li  v-for="item in carData" :key="item.id" class="item">
          <div class="cart_goods">
              <div class="goods_img">
                  <img class="goods_picture" :src="item.picture" alt="">
              </div>
              <div class="item_text">
                  <p class="goods_name">{{item.goods_name}}</p>
                  <p class= "goods_price">{{item.price}}</p>
              </div>
          </div>
          <div class="goods_num">
              
              <div class="num-btn" @click="reduceFun(item)">-</div>
              <div class="show-num">{{ item.num }}</div>
              <div class="num-btn" @click="addCar(item)">+</div>
          </div>
          <van-icon name="delete" @click="deleteFun(item)"/>
        </li>
      </ul>
      
    </div>
    <van-tabbar class="footer_total">
      <div  class="footer_btn">
          <button class="btn total_p" left >总金额：￥{{totalPrice}}</button>
          <button class="btn account" right>去结算</button>
      </div>
    </van-tabbar>
  </div>
</template>

<script>
import {  Tabbar,Icon } from 'vant';
export default {
  name: "Cart",
  data() {
    return {
   
    }
  },
  components:{
    [Tabbar.name]:Tabbar,
    [Icon.name]:Icon 
  },
  computed: { 
    //购物车列表
    carData() {
      return this.$store.state.carList;
    },
    //商品总数
    count() {
      return this.$store.getters.carCount;
    },
    //商品总价
    totalPrice() {
      return this.$store.getters.totalPrice;
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
    }

    // 用户首次登录请求购物车的数据
    // initCar(){
    //   this.$store.dispatch('initCar')
    // }
  },
  created () {
    // this.initCar();
  },
  mounted() {}
};

</script>
<style lang='stylus' scoped>
  .item
    display flex
    justify-content space-between
    align-items center
    .cart_goods
      display flex
      justify-content flex-start
      align-items center
    .goods_img
      width 1rem
      height 1rem
      .goods_picture
        width 100%
        height 100%
        display block
        .goods_name
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
     .goods_num{
       width 1rem
       display flex
       align-items center
       justify-content space-between
       padding 0 0.2rem
    }
.footer_btn
  width 100%
  display flex
  justify-content: space-between
  align-items center
  .btn
    height 100%
  .account
    width 3rem
  .total_p
    flex 1
    background #fff
   
</style>