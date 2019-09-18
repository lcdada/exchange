<template>
    <div class="pay_block">
        <div class="pay_price">
            <div class="price_text">
                <p class="price"><span>399</span>元</p>
                <p class="priceText">实付金额</p>
            </div>
        </div>
        <button class="gopay">支付并兑换</button>
    </div>
</template>

<script>
export default {
    name: "Pay"
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