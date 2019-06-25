<template>
  <div class="goodsCart_list">
    <div class="choose_address"> 
      <div>
        <img src="./../../assets/img/address_icon1.png" alt="">
      </div>
      <p class="address_icon1_text">添加收货地址</p>
      <van-icon name="arrow"  class="arrow"/>
    </div>
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
          <!-- <div class="goods_num">
              
              <div class="num-btn" @click="reduceFun(item)">-</div>
              <div class="show-num">{{ item.num }}</div>
              <div class="num-btn" @click="addCar(item)">+</div>
          </div> -->
          <van-icon name="cross" class="delete" @click="deleteFun(item)" />
        </li>
      </ul>
      
    </div>
    <!-- <van-tabbar class="footer_total">
      <div  class="footer_btn">
          <button class="btn total_p" left >总金额：￥{{totalPrice}}</button>
          <button class="btn account" right>去结算</button>
      </div>
    </van-tabbar> -->
    <div class="leave_word">
      <p class="leave_word_text">给我们留言</p>
      <textarea class="leave_word_content"></textarea>
      <button class="goto_exchange" @click="showPopup">去兑换</button>
    </div>
    <van-popup
     class="pop"
     v-model="show"
     lock-scroll:true
     >
     <div class="form">
       <p class="from_title">请验证</p>
       <input type="text" placeholder="请输入卡号" value="" class="inpt" v-model="account">
       <input type="text" placeholder="请输入密码" class="inpt" v-model="pwd">
       <input type="button" value="确认提交" class="affirm_btn" @click="catr_verify">
     </div>
     </van-popup>
  </div>
</template>

<script>
import {  Tabbar,Icon,Popup,Toast  } from 'vant';
export default {
  name: "Cart",
  data() {
    return {
      show: false,
      account:'',
      pwd:''
    }
  },
  components:{
    [Tabbar.name]:Tabbar,
    [Icon.name]:Icon,
    [Popup.name]:Popup,
    [Toast.name]:Toast   
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
    },

    // 用户首次登录请求购物车的数据
    // initCar(){
    //   this.$store.dispatch('initCar')
    // },
    goBuy(){
      // this.$router.push({path:'./address'})
      // this.$router.push({path:'/address',name:'Address'})
    },
    showPopup() {
      this.show = true;
      //测试微信支付
        this.$api.home.weipay({
            order_sn: "p2019062490155511383446",
            openid: "oepU71hOHh5uoG3kMJJG0IF3QGfI",
            action: 'orderpay'
        }).then(params =>{
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            }else{
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    JSON.parse(params),
                    function(res){
                        if(res.err_msg == 'get_brand_wcpay_request:ok') {
                            callback();
                        }else{
                        }
                    }
                );
            }
        });
    },
    catr_verify(){
        let params = {
            account: this.account,
            pwd:this.pwd,
            package_id:390,
            jid:767
        };
      

        this.$api.home.accountPwd({
                params:params
            }).then(params =>{
                if(params.data.code  == 1000){
                    this.$router.push({path:'/succeed'})
                }else if(params.data.code  == 2002){
                    Toast(params.data.msg);
                  }
            })
    }
  },
  created () {
    // this.initCar();
  },
  mounted() {}
};

</script>
<style lang='stylus' scoped>
  @import '../../assets/styles/mixins.styl' 
  .goodsCart_list
    padding 0 0.2rem
    padding-bottom 1rem
    background #f5f5f5
    .choose_address
      position relative
      height 1.12rem
      display flex
      align-items center
      border-radius 0.08rem 
      background #000
      color #fff
      padding 0 0.32rem
      margin-top 0.16rem
      .address_icon1_text
        margin-left 0.24rem
      .arrow
        position: absolute;
        right: 0.32rem;
        bottom: 0.4rem;
    .goods_list 
      margin-top 0.16rem
    .item
      position relative
      height 3.72rem 
      padding 0.32rem
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      background #fff
      margin-bottom 0.02rem
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
          width 70%
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
      // .goods_num{
      //   width 1rem
      //   display flex
      //   align-items center
      //   justify-content space-between
      //   padding 0 0.2rem
      // }
  .delete
    position absolute
    top 0
    right 0
  .leave_word 
      height 5.58rem
      background #fff
      position relative
      padding 0 0.32rem
      padding-top 0.32rem
    .leave_word_text
      font-size 0.28rem
      color #000
      font-weight 600
    .leave_word_content
      width 100%;
      height 2.38rem
      background #eee
      margin-top 0.4rem
    .goto_exchange
        width 3.24rem
        height 0.92rem
        position absolute
        bottom 0.64rem
        left  0.32rem
        color #fff
        background #000;
        border-radius 0.08rem
        display block
        margin-top 0.5rem
  .pop
    width 6.46rem
    height 6.18rem
    border-radius 0.32rem
    padding: 0.3rem;
    box-sizing: border-box;
    .form
      margin 0 auto
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .from_title
        font-size 0.32rem
        font-weight 600
        color #333
      .inpt
        width 4.24rem
        margin-top: 1rem;
        border-bottom: 1px solid #000;
        padding-bottom: 0.2rem;
      .affirm_btn
        width: 4.24rem;
        height: 0.8rem;
        background: #000;
        color: #fff;
        border-radius: 0.08rem;
        font-size: 0.28rem;
        font-weight: 500;
        margin-top: 1rem;

  // .footer_btn
  //   width 100%
  //   display flex
  //   justify-content: space-between
  //   align-items center
  //   .btn
  //     height 100%
  //   .account
  //     width 3rem
  //   .total_p
  //     flex 1
  //     background #fff
   
    
</style>