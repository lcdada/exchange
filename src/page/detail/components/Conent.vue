<template>
    <div>
        <div class="detail_text">
            <p class="serialNum">{{message.goods_sn}}</p>
            <p class="goods_name">{{message.goods_name}}</p>
            <p class="name_second">{{message.salute_sketch}}</p>
            <div v-if="show_price">
                 <p class="addPrice">+<span>{{message.markup_price | currency}}</span></p>
                 <p class="addPrice_text"><span>{{this.pageName}}</span>+<span>{{message.markup_price | currency}}</span>元，兑换此礼品</p>
            </div>
           
        </div>
        <div class="detail_conent" v-html='message.summary'>{{message.summary}}</div>
        <add-buy :addlist = "addList" v-if="showAddList"></add-buy>
        <van-tabbar class="footer">
            <div v-if="show_button_two" class="footer">
                <div  class="footer_btn"  v-if="show_addcart">
                    <button class="btn addcart"  @click="addCart(message)" >加入购物车</button>
                    <button class="btn buynow" @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
                </div>
                <div  class="footer_btn"  v-if="!show_addcart">
                    <button class="btn buynow nowButton" @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
                </div>
            </div>
            <div v-if="showAddBtn" class="footer">
                <div class="footer_btn"  >
                    <button class="btn buynow nowButton " @click="buyNow(message)" ref='nowbutton'>立即兑换</button>
                </div>
            </div>
            <div v-if="arrival_time" class="footer">
                <div  class="footer_btn"  v-if="arrival_time_text">
                    <button class="btn buynow nowButton" >{{message.start_time}}到货</button>
                </div>
                <div  class="footer_btn"  v-if="sold_out">
                    <button class="btn buynow nowButton" >{{message_text}}</button>
                </div>
            </div>
        </van-tabbar>
       
    </div>
</template>

<script>
    import AddBuy from '@/page/components/Addbuy'
    import {currency} from '@/utils/currency'
    import utils from '../../../utils/utils'
    import {  Tabbar, Toast  } from 'vant';
    export default {
        name:'DetailConent',
        props:{
            message:Object,
            flag:Boolean,
        },
         filters:{
            currency:currency
        },
        data(){
            return{
                CartList:[],
                show_addcart:true,
                source :utils.getUrlKey('source'),
                show_button_two:true,
                arrival_time:false,
                message_text:"该商品已下架",
                arrival_time_text:false,
                sold_out:false,
                show_price:false,
                // addgoods:utils.getUrlKey('addgoods'),
                addgoods:this.$route.query.addgoods,
                goodsID : utils.getUrlKey('id'),
                addList:[],
                showAddList:false,
                pageName:utils.getUrlKey('pageName'),
                addPriceId:utils.getUrlKey('addPriceId'),
                package_id:utils.getUrlKey('package_id'),
                showAddBtn:false,

                
            }
        },
        components:{
            [Tabbar.name]:Tabbar,
            [Toast.name]:Toast,
            AddBuy
        },
        created(){
            this.getAddGoods()
             if(this.addgoods || this.addgoods == 'addgoods'){
                this.show_price = true;
                 this.showTime()
            }
            if(this.source || this.source == 'goods_qrcode'){
                this.show_addcart = false;
            }
        },
        watch: {
            message:function(value){
                let valueData = value;
                let d = JSON.stringify(valueData)
                let b = (JSON.stringify(valueData) == "{}");
                if(b == false){
                    this.showTime()
                }
            },
            $route(){
                this.getAddGoods()
                if(this.source || this.source == 'goods_qrcode'){
                    this.show_addcart = false;
                }
            },
            
        },

        methods: {
            addCart(params){
                this.$store.dispatch('addCar',params);
                Toast.success('加入购物车');
            },
            buyNow(params){
                this.emptyOrder();
                this.$store.dispatch('nowAddCar',params);
                if(this.flag == false){
                    return false;
                }else{
                    if(this.addgoods || this.addgoods == 'addgoods'){
                         this.$router.push({path:'/order',query: {goods_id: params.id,now:true,addgoods:"addgoods",pageName:this.pageName,markup_id:this.addPriceId} })
                    }else{
                         this.$router.push({path:'/order',query: {goods_id: params.id,now:true} })
                    }
                   
                }

            },

            emptyOrder(){
                this.$api.home.getEmptyOrder({

                }).then(params =>{
                    if(params.data.code  == 1000){
                        const succeId = params.data.data;
                        localStorage.setItem("emptyOrderId",succeId)
                    }
                })    
            },
            showTime(){
                if (this.message.goods_stat != "1" ) {
                    this.show_button_two = false;
                    this.arrival_time = true;
                    this.sold_out = true;
                    this.showAddBtn = false;
                    return false;
                }else{
                    this.addgoods = this.$route.query.addgoods;
                    this.pageName = this.$route.query.pageName;
                    this.addPriceId = utils.getUrlKey('addPriceId');
                    if(this.addgoods || this.addgoods == 'addgoods'){
                        this.show_price = true;
                        this.showAddBtn = true;
                        this.sold_out = false;
                        this.arrival_time =false;
                        this.show_button_two = false; 
                    }else{
                        this.show_price = false;
                    }
                }
                if (!this.message.is_start) {
                    this.showAddBtn = false;
                    this.show_button_two = false;
                    this.arrival_time = true;
                    this.arrival_time_text = true;


                }

            },
              
            getAddGoods (){
                this.$api.home.getAddGoods({
                    type : this.package_id ? "package": "goods",
                    id: this.package_id ? this.package_id : this.goodsID,
                }).then(params => {
                    if(params.data.code  == 1000){
                        const data = params.data.data;
                        if(data){
                             this.showAddList = true ;
                        }
                        this.addList = data
                    }
                })
            },
        },
        mounted(){
            // this.showTime()
        },


    }

</script>
<style lang='stylus' scoped>
    .detail_text
        padding-top 0.16rem
        text-align center
        line-height 0.5rem
        padding-bottom 1.08rem
        font-family Helvetica
        .goods_name
            font-size 0.32rem
            font-weight 600
            line-height auto
            padding  0 0.4rem
        .name_second,.serialNum
            color #666
            font-size 0.28rem
            font-family Helvetica
        .addPrice
            font-size 0.32rem
            color #FF0000
            margin-top 0.1rem
        .addPrice_text
            display block
            width 100%
            height 0.8rem
            line-height 0.8rem
            background #999
            color #ffffff
            font-size 0.28rem
            margin-top 0.2rem

    .detail_conent
        padding-bottom 2rem
    .footer
        height 1.24rem
        width 100%
        box-sizing border-box
        .footer_btn
            height 1.24rem
            width 100%
            display flex
            justify-content space-between
            align-items center
            padding 0 0.4rem
            box-sizing border-box
            .btn
                width 48%
                height 0.8rem
                border 1px solid #000
                border-radius 0.08rem
            .addcart
                background #000
                color #fff
                font-size 0.28rem
            .buynow
                background #fff
                color #000
                font-weight 600
                font-size 0.28rem
            .nowButton
                width  100%
            .addbuy
                width 100%

</style>