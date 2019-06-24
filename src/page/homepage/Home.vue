<template>
    <div class="home">   
        <home-header :bless="bless_info"></home-header>
        <div>
            <p class="numb_text">你可兑换{{ exchange_num }}款礼品</p>
        </div>
        <home-list :list="goods_list"></home-list>

    </div>
</template>
<script>
import HomeHeader from './components/Header'
import HomeList from './components/List'

export default {
    name:"HomePage",
    components:{
        HomeHeader,
        HomeList
    },
    data (){
        return {
           bless_info:{},
           goods_list:[],
            exchange_num:''
        }

    },
    methods:{
        getBless () {
            this.$api.home.getBless({
               jid:767
            }).then(params => {
                    if(params.data.code  == 1000){
                        const data = params.data.data;
                        this.bless_info = data.bless_info
                    }
            })
        },
        getGoodsList (){
            this.$api.home.getGoodsList({
               package_id:390
            }).then(params => {
                if(params.data.code  == 1000){
                    this.exchange_num = params.data.data.package_info.exchange_num;
                    const data = params.data.data.goods_list;
                    // console.log(data)
                    this.goods_list = data.data
                }
            })
        },

        openAddress() {
            /*wx.ready(function () {
                wx.openAddress({
                    trigger: function (res) {
                        //alert('用户开始拉出地址');
                    },
                    success: function (res) {
                        //将收货地址信息 回显到 表单里
                        localStorage.setItem('addressInfo',JSON.stringify(res));

                        //回显收货地址
                        $('.username').html(res.userName);
                        $('.tel').html(res.telNumber);
                        $('.province').html(res.provinceName);
                        $('.city').html(res.cityName);
                        $('.area').html(res.countryName);
                        $('.detail').html(res.detailInfo);
                        $('.choose').html('');
                        $('.Shipping_address').css('marginTop','15px');
                    },
                    cancel: function (res) {
                        //alert('用户取消拉出地址');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
            });*/
        }
    },

     mounted () {
         this.openAddress(), this.getBless(), this.getGoodsList()
    },
}
</script>
<style lang="stylus">
    .home
        padding 0 .2rem
        background #fff
        .numb_text
            text-align center
            display block
            padding 0.8rem 0 0.32rem 0
            font-weight 600
</style>
