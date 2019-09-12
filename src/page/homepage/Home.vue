<template>
    <div class="home">   
        <home-header :bless="bless_info" :package="package_id" v-if="show" :title="title"></home-header>
        <div>
            <p class="numb_text">您可兑换<span class="number">{{exchange_num}}</span>款礼品</p>
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
    props:["flag"],
    data (){
        return {
            show:true,
            bless_info:{},
            title:'',
            goods_list:[],
            exchange_num:'',
            jid : utils.getUrlKey('jid'),
            package_id:utils.getUrlKey('package_id'),
            donate_id:utils.getUrlKey('donate_id'),
            donate_type:utils.getUrlKey('donate_type'),
            requestParam : {}
        }

    },
    created(){
        if( this.flag == false){
            this.show = false
        }
    },
    methods:{
        getBless () {
             if(this.donate_id) {
                this.requestParam = {
                    donate_id:this.donate_id
                }
            }else{
                this.requestParam = {
                    jid:this.jid
                }
            }
            
            this.$api.home.getBless(this.requestParam).then(params => {
                if(params.data.code  == 1000){
                    const data = params.data.data;
                    console.log(data)
                    this.bless_info = data.bless_info;
                    $('.title').html(data.title);

                    this.package_id = data.package_id;

                    this.getGoodsList(this.package_id);
                }
            })
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
        // this.getGoodsList()
    },
}
</script>
<style lang="stylus">
    .home
        padding 0 .2rem
        background #fff
        // @media screen and (min-width: 1180px) {
        //     width 80%
        //     margin 0 auto
        // }
        .numb_text
            text-align center
            display block
            padding 0.8rem 0 0.32rem 0
            font-weight 600
            font-size 0.32rem
            .number
                font-size 0.36rem
                padding 0 0.04rem
</style>
