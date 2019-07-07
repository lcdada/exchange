<template>
    <div class="goodsCart_list">
        <div class="choose_address" v-if="!showAddress" ref='suke'>
            <div>
                <img src="./../../assets/img/address_icon1.png" alt="">
            </div>
            <p class="address_icon1_text" @click="openAddress()">添加收货地址</p>
            <van-icon name="arrow"  class="arrow"/>
        </div>
        <div class="show_address" style="display:none">
            <div class="peopleInfo">
                <p class="userName" :userName="userName">{{userName}}</p>
                <p class="telNumber" :telNumber="telNumber">{{telNumber}}</p>    
            </div>
            <p class="address_text" :detail="detail">{{detail}}</p>          
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
                    <!-- <van-icon name="cross" class="delete" @click="deleteFun(item)" /> -->
                </li>
            </ul>

        </div>
        <div class="leave_word">
            <p class="leave_word_text">给我们留言</p>
            <textarea class="leave_word_content" v-model="remark"></textarea>
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
  name: "Order",
  data() {
    return {
      show: false,
      account:'',
      pwd:'',
      address : {},
      remark:'',
      isWx: false,
      chooseGoods : '',
      jid :'',
      packageId : '',
      exchangeNum : '',
      showAddress:false,
      userName:'',
      telNumber:'',
      detail:''
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
        if(this.$route.query.now!=undefined){
        		return this.$store.state.nowlist;
        	}else{
        		return this.$store.state.carList;
        	}
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
          this.jid = localStorage.getItem('jid');
          this.exchangeNum = localStorage.getItem('exchange_num'+this.jid);
          this.packageId = localStorage.getItem('package_id'+this.jid);

          //0.判断是否提交的有购物车商品
        //   if(this.carData === 'null' ||this.carData.length === 0) {
        //       Toast("请选择商品！");
        //   }

        //   if(this.carData.length > this.exchangeNum) {
        //       Toast("你最多可以兑换"+this.exchangeNum+"款商品");
        //   }

          for(var i in this.carData)
          {
            this.chooseGoods += this.carData[i].id+',';
          }

          //1.判断是否选择收货地址
          let addressInfo = '';
          addressInfo = localStorage.getItem('addressInfo');
          if(!addressInfo || addressInfo === 'null') {
              this.openAddress();
          }

          addressInfo = JSON.parse(addressInfo);
          //2.获取收货地址并验证
          this.address = {
              username : addressInfo.userName,
              mobile : addressInfo.telNumber,
              address : addressInfo.detailInfo,
              area : addressInfo.provinceName+','+addressInfo.cityName+','+addressInfo.countryName, //省市区， 逗号拼接

              remark : this.remark,
          };

          if(!this.isWx) {
              if(this.address.mobile === '') {
                  Toast("请填写您的手机号码");
              }

              if(this.address.address === '') {
                  Toast("请填写你的地址信息");
              }
          }

          //3.显示输入卡密弹框
          this.show = true;
      },

      openAddress() {

        //     var addressInfo={
        //       userName:'苏克',
        //       telNumber:'15810227932',
        //       provinceName:' 山西',
        //       cityName:'运城',
        //       countryName:'永济',
        //       detailInfo:'中关村在线'
        //   }

        //   localStorage.setItem('addressInfo',JSON.stringify(addressInfo));

        //输出地址信息到页面
            

          if(this.isWx) {
              let showAddress = this.showAddress;
              wx.ready(function () {
                  wx.openAddress({
                      trigger: function (res) {
                          //alert('用户开始拉出地址');
                      },
                      success: function (res) {
                          $('.choose_address').hide();
                          $('.show_address').show();

                          $('.userName').html(res.userName);
                          $('.telNumber').html(res.telNumber);
                          $('.address_text').html(res.provinceName +' '+ res.cityName+ ' '+ res.countryName+' '+res.detailInfo);

                          //将收货地址信息 回显到 表单里
<<<<<<< HEAD
                         /* that.userName = res.userName;
                          that.telNumber = res.telNumber
                          that.detail = res.provinceName +' '+ res.cityName+ ' '+ res.countryName+' '+res.detailInfo*/
=======
                        //   this.showAddress = true;
                        //   this.userName = res.userName;
                        //   this.telNumber = res.telNumber
                        //   this.detail = res.provinceName +' '+ res.cityName+ ' '+ res.countryName+' '+res.detailInfo
                             $('.choose_address').hide();
							 $('.show_address').show();

							 $('.userName').html(res.userName);
							 $('.telNumber').html(res.telNumber);
							 $('.address_text').html(res.provinceName +' '+ res.cityName+ ' '+ res.countryName+' '+res.detailInfo);
>>>>>>> a5e2414940ecab93e7337e8cc9537b2c290746ef
                          localStorage.setItem('addressInfo',JSON.stringify(res));

                      },
                      cancel: function (res) {
                          //alert('用户取消拉出地址');
                      },
                      fail: function (res) {
                          //alert(JSON.stringify(res));
                      }
                  });
              });
          }else{
              //跳转新页面  编辑地址 并 save 保存到 localStorage addressInfo
          }
      },

      catr_verify(){
          //4.验证卡密
          this.$api.home.accountPwd({
              account: this.account,
              pwd:this.pwd,
              package_id:this.packageId,
              jid:this.jid
          }).then(params =>{
              if(params.data.code  == 1000){
                  this.chooseGoods = this.chooseGoods.split(',')[0];

                  //5.获取订单信息 提交订单
                    let orderData = {
                        choose_goods : this.chooseGoods,
                        package_id : this.packageId,
                        account : this.account,
                        pwd : this.pwd,
                        address : this.address
                    };

                    this.generateOrder(orderData);

                  //this.$router.push({path:'/succeed'})
              }else if(params.data.code  == 2002){
                  Toast(params.data.msg);
              }
          })
      },
      generateOrder(params) {
        this.$api.home.generateOrder(params).then(params =>{
            if(params.data.code === 1000){
                this.$router.push({path:'/succeed','query':{"order_sn":params.data.data.ordersn}})
            }else if(params.data.code === 2002){
                Toast(params.data.msg);
            }
        });
      }
  },
    created () {
        localStorage.setItem('addressInfo',null);
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            if(ua.match('wxwork') == "wxwork") {
                this.isWx = false;
            }
            this.isWx = true;
        } else {
            this.isWx = false;
        }
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
        padding-top 0.2rem
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
    .show_address
        height 1.4rem
        background #fff
        padding 0.2rem
        box-sizing border-box
        border-bottom 0.02rem solid #f5f5f5
        .peopleInfo
            display flex
            justify-content flex-start
            align-items center
            line-height 0.4rem
            .userName,.telNumber
                font-size 0.28rem
                font-weight 600
                color #000
            .telNumber
                margin-left 0.8rem
        .address_text
            line-height 0.6rem
            color  #999
            font-size 0.24rem   
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
        width 50%
        ellipsis()
    .goods_title
        ellipsis()
        font-size 0.28rem
        color #666
        padding-top 0.2rem
    .goods_num
        position absolute
        bottom 0 left 0
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
        background #f5f5f5
        margin-top 0.4rem
        background #eee
        margin-top 0.4rem
        padding  0.2rem
        box-sizing  border-box
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
