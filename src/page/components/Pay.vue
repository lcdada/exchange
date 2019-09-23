<template>
    <div class="pay_block">
        <div class="pay_price">
            <div class="price_text">
                <p class="price"><span>{{this.weipaynum  |  currency}}</span>元</p>
                <p class="priceText">实付金额</p>
            </div>
            <div class="payBlock">
                <p class="pay_text">支付方式</p>
                <div class="weipay">
                    <img src="../../assets/img/weipayIcon.png" alt="">
                </div>
            </div>
        </div>
        <button class="gopay" @click="pay">支付并兑换</button>
    </div>
</template>

<script>
import utils from '@/utils/utils'
import {currency} from '@/utils/currency'
export default {
    name: "Pay",
    filters:{
		currency:currency
    },
    data() {
        return {
            orderSn : utils.getUrlKey('order_sn'),
            weipaynum : utils.getUrlKey('weipay'),
        }
    },
    methods: {
        pay(){
            this.$api.home.getWeiPay({
                order_sn:this.orderSn,
                openid:"oepU71hOHh5uoG3kMJJG0IF3QGfI"

            }).then(params =>{
                if(params.data.code  == 1000){
                    console.log(params.data.data)
                    alert(params.data)
                    alert(params.data.data);
                   
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
								params.data.data,
								function(res){
									if(res.err_msg == 'get_brand_wcpay_request:ok') {
										//跳转到成功页面
									}else{
										//WeixinJSBridge.log(res.err_msg);
										//alert(res.err_code+res.err_desc+res.err_msg);
									}
								}
						);
					}
                }
            })    
        }
    },
};
</script>
<style lang='stylus' scoped>
    .pay_block 
        padding 0 0.2rem
        padding-bottom 1rem
        background #f5f5f5
        padding-top 0.56rem
        .pay_price
            width 100%
            height 5.4rem
            background #fff
            .price_text
                display flex
                justify-content center
                flex-direction column
                margin  0 0.44rem
                height 2.7rem
                border-bottom 0.01rem solid #eee
                .price
                    font-size 0.68rem;
                    font-family PingFang-SC
                    font-weight bold
                    line-height 0.96rem
                    text-align center
                .priceText
                    text-align center
                    font-size 0.28rem
                    line-height 0.4rem
                    margin-top 0.12rem
            .payBlock
                padding-top 0.84rem
                margin 0 0.44rem
                .pay_text
                    font-size 0.28rem
                    font-weight 600
                    line-height 0.4rem
                .weipay
                    width 100%
                    height 0.64rem
                    margin-top 0.3rem
                .weipay img 
                    width 100%
                    height 100%



    .gopay
        width 6.46rem
        height 0.8rem
        display block
        margin 0 auto
        color #fff
        background #000;
        display block
        margin-top 2.3rem
    
</style>