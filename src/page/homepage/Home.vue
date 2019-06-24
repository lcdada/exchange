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
    },

     mounted () {
         this.getBless(), this.getGoodsList()
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
