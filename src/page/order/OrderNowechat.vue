<template>
    <div class="goodsCart_list">
        <div>
            <van-cell-group>
                <van-field v-model="userName" required clearable label="联系人" placeholder="姓名"/>
                <van-field v-model="telNumber" type="number" label="电话" placeholder="手机号" required/>
                <van-field label="地址" placeholder="请选择省市区" readonly  @click="handleAdderssClick" v-model="showAddressInfo"/>
                <van-field label="详细地址" placeholder="请输入详细地址"  v-model="detailInfo"/>
            </van-cell-group>
            <van-popup  v-model="showChooseAddress" position="bottom"  :style="{ height: '40%' }">
                <van-area 
                    :area-list="areaList"
                    :columns-placeholder="['请选择省会', '请选择地区', '请选择市(县)']"
                    @cancel=cancel
                    @confirm=confirm
                />
            </van-popup>
        </div>

        <div class="standby">
            <p>备用联系人</p>
            <input type="text" name="" id="" placeholder="姓名" class="standby_inp" v-model="standbyName">
            <input type="number" name="" id="" placeholder="联系方式" class="standby_inp" v-model="standbyPhone">
        </div>

        <div class="timeChoose" v-if="showChooseTime">
            <div  @click="choose_time" class="choose_block">
                <span class="timeChoose_block_left">选择发货时间：</span>
                <input class="timeChoose_block_right" type="text" disabled="disabled" v-model="seleDate"/>
                <span class="arrow"></span>
            </div>
            <div v-if="showTime" class="active_block">
                <div  class="div_item_time" v-for="(item,index) in list" @click="fn(index)" :key="index" :class="{active:ide ==index}">{{item}}</div>
            </div>


        </div>
        <div class="Aog" v-if="showAog">
            您的商品发货时间预计{{aog}}
        </div>

        <div class="goods_list">
            <ul>
                <li  v-for="item in carData" :key="item.id" class="item">
                    <!-- <div class="cart_goods"> -->
                    <div class="goods_img">
                        <img class="goods_picture" :src="item.picture" alt="">
                    </div>
                    <div class="item_text">
                        <p class="goods_name">{{item.goods_name}}</p>
                        <p class= "goods_title">{{item.title}}</p>
                        <div v-if="showPrice">
                            <p class="goods_num"> x{{ item.num }}</p>
                        </div>
                        <div class="goods_num" v-if="!showPrice">
                            <div>+<span>{{item.addprice | currency}}</span></div>
                            <div>x {{item.num}}</div>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
        <!-- <div class="overview" v-if="showAddMes">
            <p class="overview_title">概览</p>
            <ul class="pay_goods">
                <li>
                    <div class="itemMes">
                        <p class="acro_item">礼包抵扣:<span class="g_name">{{this.pageName}}</span></p>
                        <p><span>{{ this.libaoprice  | currency}}</span></p>
                    </div>
                    <div class="itemMes" v-if="showDiscount">
                        <p class="acro_item">折扣优惠:<span class="g_name"></span></p>
                        <p><span class="loseSprice">{{this.zhekou | currency}}</span></p>
                    </div>
                </li>
            </ul>
            <div class="amountPayable">
                <span class="amount_text">应付金额</span><span class="amoun_mun">{{this.totalPrice | currency}}</span>
            </div>
        </div> -->
        <div class="notice" :notice = "notice">{{notice}}</div>
        <div class="leave_word">
            <p class="leave_word_text">给我们留言</p>
            <textarea class="leave_word_content" v-model="remark"></textarea>
            <button class="goto_exchange" @click="showPopup" v-if="showAddBtn">去兑换</button>
            <button class="goto_exchange" @click="submit" v-if="!showAddBtn">提交</button>
        </div>
        <van-popup
                class="pop"
                v-model="show"
                lock-scroll:true
        >
            <div class="form">
                <p class="from_title">请验证</p>
                <input type="number" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入卡号" value="" class="inpt" v-model="account">
                <input type="number" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入密码" class="inpt" v-model="pwd">
                <input type="button" value="确认提交" class="affirm_btn" @click="catr_verify"  :disabled="isDisable">
            </div>
        </van-popup>
        <van-popup
                class="pop"
                v-model="showagain"
                lock-scroll:true
        >
            <div class="form">
                <p class="from_title">请验证</p>
                <div class="code_block">
                    <input type="number" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输入手机号" value=""   class="input_code" v-model="mobile">
                    <!-- <button @click="getCode">获取验证码</button> -->
                    <button @click="getCode" v-if="!showCode">获取验证码</button>
              	    <button @click="getCode" v-if="showCode">{{codeTime}}s后重新获取</button>
                </div>
                <input type="number" @focus="inputFocus($event)" @focusout="inputFocusout" placeholder="请输验证码" value=""   class="inpt" v-model="code">
                <button class="btn_affirm" @click="catr_verify" :disabled="isDisable">确认提交</button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import utils from '../../utils/utils'
    import areaList from '../../assets/js/area.js'
    import {  Tabbar,Icon,Popup,Toast ,AddressEdit,Area,Field ,CellGroup   } from 'vant';
    import {currency} from '@/utils/currency'
    export default {
        name: "OrderNowechat",
         filters:{
            currency:currency
        },
        data() {
            return {
                show: false,
                showagain:false,
                pwd:'',
                address : {},
                remark:'',
                isWx: false,
                chooseGoods : '',
                jid :'',
                packageId : '',
                exchangeNum : '',
                detail:'',
                notice:'',
                timer:null,
                donate_type:utils.getUrlKey('donate_type'),
                mobile:utils.getUrlKey('mobile'),
                account:utils.getUrlKey('account'),
                requestParam:{},
                code:'',
                standbyName:'',
                standbyPhone:'',
                lastClick :'',
                isDisable:false,
                list: [],
                ide: 0, //默认选择第一个,
                showChooseTime:false,
                showTime:false,
                seleDate:'',
                aog:'',
                showAog:false,
                showPrice:true,
                showAddBtn:true,
                showAddMes:false,
                addgoods:utils.getUrlKey('addgoods'),
                pageName:utils.getUrlKey('pageName'),
                emptyId:'',
                score:"",
                addPriceId:utils.getUrlKey('addPriceId'),
                markup_id:utils.getUrlKey('markup_id'),
                libaoprice:"",
                zhekou:"",
                showDiscount:false,
                showCode:false,
                codeTime:0,
                areaList,
                searchResult: [],
                showChooseAddress:false,
                countryName:"",
                userName:'',
                telNumber:'',
                detailInfo:'',
                showAddressInfo:'',
                addressNoWechat:{}
            }
        },
        components:{
            [Tabbar.name]:Tabbar,
            [Icon.name]:Icon,
            [Popup.name]:Popup,
            [Toast.name]:Toast,
            [AddressEdit.name]:AddressEdit,
            [Area.name]:Area,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup
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

                if(this.$route.query.now!=undefined){
                    return this.$store.getters.addtotalPrice1;
                }else{
                    return  this.$store.getters.addtotalPrice;
                }
            }
        },
        methods: {
            handleAdderssClick(){
                this.showChooseAddress = true
            },
            cancel(){
                this.showChooseAddress = false
            },
            confirm(msg){
                localStorage.setItem("ProvincCity",JSON.stringify(msg))
                const provinceName = msg[0].name;
                const cityName=msg[1].name;
                const countryName= msg[2].name;
                this.showAddressInfo = provinceName +" "+ cityName +" "+countryName;
                this.showChooseAddress = false;

                this.$api.home.getGoodsNoticeNew({
                    goods_id:utils.getUrlKey('goods_id'),
                    type:"7",
                    city:provinceName

                }).then(params =>{
                    if (params.data.code  == 1000) {
                        this.notice = params.data.data.post_content;
                    }else{
                        this.notice = "";
                    }
                })
            },
            init () {
                let id = utils.getUrlKey('goods_id')
                this.$api.home.getGoodsDetail({
                    goods_id:id,
                    markup_id:this.markup_id
                }).then(params =>{
                    if(params.data.code  == 1000){
                        const data = params.data.data[0];
                        this.libaoprice = data.markup_package_price;
                        this.aog = data.start_time;
                        this.zhekou = data.markup_sale_price;
                        if (this.zhekou) {
                            this.showDiscount = true
                        }

                        if(data.is_set_send_time != 1){
                            this.showChooseTime = true
                        }
                        if(data.is_set_send_time == 1 && data.service_time_type == 2){
                            this.showAog = true
                        }

                    }
                })
            },
            fn(index) {

                this.ide = index+1;

                this.seleDate = document.getElementsByClassName('div_item_time')[index].innerHTML; //获取当前选中的时间
                this.showTime = false;

            },

            getDate(n) {

                var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400

                var timestamp = new Date().getTime(); //获取当前时间戳

                var date1 = new Date(ss * n + timestamp) //加上n天的国际标准日期

                var newTime = date1.toLocaleString(); //把日期转换成2018/6/4 下午10:45:19 格式

                var arr = newTime.split(" "); //把2018/6/4提取出来

                var arr2 = arr[0].split('/'); //把年月日数字单独提出来

                // return arr2[0] + '年' + arr2[1] + '月' + arr2[2] + '日'; //拼接成我们需要的格式返回

                return  arr2[1] + '月' + arr2[2] + '日'; //拼接成我们需要的格式返回


            },
            choose_time(){
                this.showTime =true
            },
            showPopup() {
                let addressInfo = ""
                if(this.userName === '') return Toast("请填写您的姓名");
                if(this.telNumber === '') return Toast("请填写您的手机号码");
                if(this.showAddressInfo === '')return Toast("请选择省市区");
                if(this.detailInfo === '') return Toast("请填写详细地址");
                
                for(var i in this.carData)
                {
                    this.chooseGoods += this.carData[i].id+',';
                }
                addressInfo = JSON.parse(localStorage.getItem("ProvincCity"))
                const area = addressInfo[0].name+','+addressInfo[1].name +','+addressInfo[2].name;
                
                this.addressNoWechat ={
                    userName : this.userName,
                    telNumber : this.telNumber,
                    detailInfo : this.detailInfo,
                    remark : this.remark,
                    spare_name:this.standbyName,
                    spare_mobile:this.standbyPhone,
                    provinceName:addressInfo[0].name,
                    cityName:addressInfo[1].name,
                    countryName:addressInfo[2].name
                }    
                    console.log(this.addressNoWechat)
                    
                 localStorage.setItem('addressInfo',JSON.stringify(this.addressNoWechat));

                 this.address = {
                    username : this.userName,
                    mobile : this.telNumber,
                    address : this.detailInfo,
                    // area : addressInfo[0].name+','+addressInfo[1].name +','+addressInfo[3].name, //省市区， 逗号拼接
                    area : area,
                    remark : this.remark,
                    spare_name:this.standbyName,
                    spare_mobile:this.standbyPhone,
                    provinceName:addressInfo[0].name,
                    cityName:addressInfo[1].name,
                    countryName:addressInfo[2].name
                };
               
              
                //3.显示输入卡密弹框
                let donate_type = this.donate_type
                if(!donate_type){
                    this.jid = localStorage.getItem('jid');
                    this.packageId = localStorage.getItem('package_id'+this.jid);
                    this.show = true;
                }else{
                    this.packageId = utils.getUrlKey('package_id'),
                    this.showagain = true
                }
            },
            // 加价购提交
            submit(){
                if(!this.isWx) {
                    if(this.address.mobile === '') {
                        Toast("请填写您的手机号码");
                    }

                    if(this.address.address === '') {
                        Toast("请填写你的地址信息");
                    }
                }

                //3.显示输入卡密弹框
                let donate_type = this.donate_type
                if(!donate_type){
                    this.jid = localStorage.getItem('jid');
                    this.packageId = localStorage.getItem('package_id'+this.jid);
                    this.show = true;
                }else{
                    this.packageId = utils.getUrlKey('package_id'),
                        this.showagain = true
                }
            },

        //     checkGoodsRegion(orderData) {
        //         console.log(orderData)
		// 	this.$api.home.checkGoodsRegion({
		// 		gid: orderData.goodsInfo,
		// 		addre: orderData.addressInfo
		// 	}).then(params =>{
		// 		if(params.data.status === 101){
        //             //生成订单
        //             if(this.addgoods || this.addgoods == 'addgoods'){
        //                 this.addgenerateOrder(orderData);
        //             }else{
        //                 this.generateOrder(orderData);
        //             }
		// 		}else if(params.data.code === 2002){
		// 			alert("该区域暂不支持配送");
		// 		}
		// 	});
		// },


            catr_verify(){
                //4.验证卡密
                this.isDisable = true
                setTimeout(() => {

                    if(this.donate_type){
                        if(!this.code){
                            Toast("请填写验证码");
                            return false
                        }
                        this.chooseGoods = this.chooseGoods.split(',')[0];

                        //5.获取订单信息 提交订单
                        let orderData = {
                            choose_goods : this.chooseGoods,
                            package_id : this.packageId,
                            address : this.address,
                            mobile : this.mobile,
                            code : this.code,
                            account: this.account,
                        };

                        this.generateOrder(orderData);
                    }else{
                            this.$api.home.accountPwd({
                            account: this.account,
                            pwd:this.pwd,
                            package_id:this.packageId,
                            jid:this.jid,
                            source:utils.getUrlKey('source'),
                            goods_id:utils.getUrlKey('goods_id'),
                            choose_out_time:this.ide,
                            idss:7
                        }).then(params =>{
                            if(params.data.code  == 1000){
                                this.chooseGoods = this.chooseGoods.split(',')[0];

                                //5.获取订单信息 提交订单
                                let orderData = {
                                    choose_goods : this.chooseGoods,
                                    package_id : params.data.data.package_id ? params.data.data.package_id : this.packageId,
                                    account : this.account,
                                    pwd : this.pwd,
                                    address : this.address,
                                    source:utils.getUrlKey('source'),
                                    choose_out_time: this.ide
                                };

                                this.generateOrder(orderData);
                            }else if(params.data.code  == 2002){
                                Toast(params.data.msg);
                                this.showagain = false
                            }
                        })
                    }
                    this.isDisable = false
                }, 1000)

            },
            // 获取验证码
            getCode(){
                this.$api.home.getCode({

                    mobile : this.mobile
                }).then(params => {
                    if(params.data.code == 1000){
                        this.showCode = true,
                        this.codeTime = 60;
                        let codeTimeTimer =  setInterval(()=>{
                            this.codeTime--;
                            if(this.codeTime<=0){
                                this.showCode = false;
                                clearInterval(codeTimeTimer);
                            }
                        }, 1000);
                    }
                })
            },
            btn_affirm(){

            },
            inputFocus(){
                clearTimeout(this.timer)
            },
            inputFocusout() {
                this.timer = setTimeout(() => {
                    window.scrollTo(0,0)
                    // 间隔设为10，减少页面失去焦点定时器的突兀感，
                },10)
            },
            destroyed() {
                clearTimeout(this.timer)
            },
            generateOrder(params) {
                this.$api.home.generateOrder(params).then(params =>{
                    if(params.data.code === 1000){
                        this.$router.push({path:'/succeed','query':{"order_sn":params.data.data.ordersn}})
                    }else if(params.data.code === 2002){
                        Toast(params.data.msg);
                    }
                });
            },
            // 加价购生成订单
             addgenerateOrder(params) {
                this.$api.home.getSubmitOrder(params).then(params =>{
                    if(params.data.code === 1000){
                        // console.log(params)
                        this.$router.push({path:'/pay','query':{"order_sn":params.data.data.order_sn,weipay:this.totalPrice}})
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
            this.init ();
            var dateObj = {};

            for(var i = 1; i <= 7; i++) {

                dateObj = this.getDate(i); //把返回的日期赋值给对象

                this.list.push(dateObj); //把对象添加到数组里面，然后渲染到页面

            }

            if(this.addgoods || this.addgoods == 'addgoods'){
                this.showAddMes = true;
                this.showPrice = false;
                this.showAddBtn = false;
            }



        },
        mounted() {

        }
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
        width 100%
        box-sizing border-box
        display flex
        align-items center
        border-radius 0.08rem
        background #000
        color #fff
        padding 0 0.32rem
        margin-top 0.16rem
        .address_icon1_text
            margin-left 0.24rem
            display block;
        .arrow
            position: absolute;
            right: 0.32rem;
            bottom: 0.4rem;
    .standby
        height: 3.5rem;
        background: #fff;
        margin-top: 0.2rem;
        box-sizing: border-box;
        padding: 0.2rem 0.4rem;
        display: flex;
        flex-direction: column;
        .standby_inp
            height 0.88rem;
            background #ebebeb
            margin-top 0.4rem
            padding-left 0.2rem
    .Aog
        height 0.6rem;
        line-height 0.6rem
        background #fff
        margin-top 0.2rem
        color #ea2000
        text-align center
        .Aog_time
            padding 0 0.2rem
    .timeChoose
        background #fff
        // height 3.5rem
        margin-top 0.2rem
        position relative
        .choose_block
            display flex
            justify-content space-between
            align-items center
            padding  0 0.4rem;
            position relative
            .timeChoose_block_left
                display block
                // width 100%
                height 1rem
                line-height 1rem
            .timeChoose_block_right
                display block
                background #fff
                width 1.4rem
            .arrow
                display: inline-block;
                content: " ";
                height: 0.1rem;
                width: 0.1rem;
                border-width: 0.03rem 0.03rem 0 0;
                border-style: solid;
                -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                -webkit-transform-origin: center;
                transform-origin: center;
                position: absolute;
                top: 48%;
                right: 0.2rem;
                margin-top: -0.04rem;
        .active_block
            position absolute
            top 1rem
            right 0.6rem;
            z-index 99
            background #eee
            padding 0.2rem
            .div_item_time{
                height 0.6rem
                line-height 0.6rem
                border-bottom 0.01rem solid #ccc
            }

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
        width 100%
        padding 0.32rem
        box-sizing border-box
        display flex
        justify-content space-between
        align-items center
        background #fff
        margin-bottom 0.02rem
        // .cart_goods
        //     width 100%
        //     height 100%
        //     display flex
        //     justify-content space-between
        //     align-items center
        .goods_img
            width 2.8rem
            height 3.14rem
            .goods_picture
                width 100%
                height 100%
                display block
        .item_text
            margin-left: 0.32rem;
            width 3.66rem
            height 3.14rem
            box-sizing border-box
            padding-top 0.18rem
            position relative
            .goods_name
                font-size 0.28rem
                color #333
                font-weight 600
                width 90%
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
                display inline-flex
                justify-content space-between
                width 100%
                align-items center
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
    .overview
        min-height 3.8rem
        background #fff
        margin 0.3rem 0
        padding 0.32rem 0.32rem 0rem 0.32rem
        box-sizing border-box
        .overview_title
            font-size 0.32rem
            font-weight bold
            line-height 0.44rem
        .pay_goods
            margin-top 0.34rem
            border-bottom: 0.01rem solid #eee;
            padding-bottom: 0.3rem;
            min-height 1.1rem
        .amountPayable
            margin-top 0.32rem
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.6rem;
            .amount_text
                font-size 0.28rem
                color #000
                font-weight bold
            .amoun_mun
                font-weight bold
                color #ff0000
                font-size 0.32rem

        .itemMes
            display flex
            justify-content space-between
            align-items center
            line-height 0.4rem
            margin 0.16rem 0
            color #666
        .g_name
            display: inline-block;
            width: 3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 0.4rem;
        .loseSprice
            text-decoration:line-through
        .acro_item{
            display flex
            align-items center
        }

    .notice
        color: #ea2000;
        background: #fff;
        text-align: center;
        padding: 0.1rem 0.3rem;
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
        -webkit-appearance none
        border-radius 0
    .goto_exchange
        width 100%
        height 0.92rem
        // position absolute
        // bottom 0.64rem
        // left  0.32rem
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
    .inpt,.code_block
        width 4.24rem
        height 0.6rem
        border-radius 0
        margin-top: 0.6rem;
        border-bottom: 1px solid #000;
    // padding-bottom: 0.2rem;
    .code_block
        display flex
        justify-content space-between
        align-items center
        .input_code
            width 2rem
    .btn_affirm
        width 4.24rem
        height 0.8rem
        background #333
        color #ffffff
        display  block
        margin 0 auto
        margin-top 1.6rem
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
