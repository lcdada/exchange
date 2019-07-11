<template>
    <div class="home">   
        <home-header :bless="bless_info" :package="package_id"></home-header>
        <div>
            <p class="numb_text">你可兑换<span>{{exchange_num}}</span>款礼品</p>
        </div>
        <home-list :package="package_id" :list="goods_list" :bless="bless_info"></home-list>

    </div>
</template>
<script>
import HomeHeader from './components/Header'
import HomeList from './components/List'
import utils from '@/utils/utils'

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
            exchange_num:'',
            package_id:'',
            jid : utils.getUrlKey('jid') ? utils.getUrlKey('jid') : 767
        }

    },
    methods:{
        getBless () {
            this.$api.home.getBless({
               jid:this.jid
            }).then(params => {
                if(params.data.code  == 1000){
                    const data = params.data.data;
                    this.bless_info = data.bless_info
                    this.package_id = data.package_id;

                    this.getGoodsList(this.package_id);
                }
        },

        getGoodsList (package_id){
            this.$api.home.getGoodsList({
               package_id:package_id
            }).then(params => {
                if(params.data.code  == 1000){
                    const data = params.data.data.goods_list;
                    const exchange_num = params.data.data.package_info.exchange_num
                    this.exchange_num = exchange_num
                    this.goods_list = data.data

                    localStorage.setItem('package_id'+this.jid,package_id);
                    localStorage.setItem('exchange_num'+this.jid,this.exchange_num);
                    localStorage.setItem('jid',this.jid);
                }
            })
        },
    },

    mounted () {
        this.getBless()
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
