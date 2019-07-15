<template>
    <div class="home">   
        <home-header :bless="bless_info" :package="package_id" v-if="show"></home-header>
        <div>
            <p class="numb_text">你可兑换<span class="number">{{exchange_num}}</span>款礼品</p>
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
            goods_list:[],
            exchange_num:'',
            package_id:'',
            // jid : utils.getUrlKey('jid'),
            jid:767,
            package_id:'390',
            account:22222222,
            // donate_id:19602,
            mobile:15810227932,
            donate_type:'1',
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
                    this.bless_info = data.bless_info
                    
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
            font-size 0.32rem
            .number
                font-size 0.36rem
                padding 0 0.04rem
</style>
