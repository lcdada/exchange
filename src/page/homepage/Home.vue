<template>
    <div class="home">   
        <home-header :bless="bless_info" :package="package_id" v-if="show" :title="title"></home-header>
        <div>
            <p class="numb_text">您可兑换<span class="number">{{exchange_num}}</span>款礼品</p>
        </div>
        <home-list :package="package_id" :list="goods_list" :bless="bless_info"></home-list>
        <add-buy :addlist = "addList" :package="package_id" :mid = "midOne" v-if="showAddSwiper"></add-buy>
        <van-popup
            class="pop"
            v-model="showNotice"
            lock-scroll:true
        >
            <div class="form">
                <span class="from_title">{{noticeTitle}}</span>
                <div class="noticeCont">{{noticeContent}}</div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import {Popup} from 'vant'
import HomeHeader from './components/Header'
import HomeList from './components/List'
import utils from '@/utils/utils'
import AddBuy from '@/page/components/Addbuy'
import axios from 'axios'

export default {
    name:"HomePage",
    components:{
        HomeHeader,
        HomeList,
        AddBuy,
        [Popup.name]:Popup

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
            // package_id:utils.getUrlKey('package_id'),
            donate_id:utils.getUrlKey('donate_id'),
            donate_type:utils.getUrlKey('donate_type'),
            requestParam : {},
            addList:[],
            midOne:"",
            package_id:"",
            showAddSwiper:false,
            showNotice:true,
            noticeTitle:"",
            noticeContent:""
        }

    },
    created(){
        if( this.flag == false){
            this.show = false
        }
        // this.videoPlay()
        this.getNotice()
    },
    methods:{
        getNotice(){
            this.$api.home.getCurrencyNotice().then(params=>{
                if(params.data.status  == 101){
                    // this.showNotice = true
                    this.noticeTitle = params.data.data[0].post_title
                    this.noticeContent =  params.data.data[0].post_content
                }else{
                    // this.showNotice = false
                }   
            })
            .catch((err)=>{
                // this.showNotice = false
                 this.noticeTitle = "2020春节快递提醒"
                this.noticeContent =  "快递受春节假期影响，1月13日—31日快递停止发货(部分厂家放假1月7日停止发货），微信及网站可正常兑换，节后陆续发出！客服热线1月24日-26日暂停服务，不便之处请谅解！祝您春节愉快、阖家幸福！"
            })
        },
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
                    localStorage.setItem("video",data.bless_info.video),
                    localStorage.setItem("sharePic",data.bless_info.share_img)
                    
                    this.bless_info = data.bless_info;
                    // $('.title').html(data.title);

                    this.package_id = data.package_id;

                    this.getGoodsList(this.package_id);
                    this.getAddGoods(this.package_id)
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
        getAddGoods (package_id){
            let isWeiXin = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 }
            if (isWeiXin()) {
                this.$api.home.getAddGoods({
                    type : "package",
                    id: package_id
                }).then(params => {
                    if(params.data.code  == 1000){
                        const data = params.data.data;
                        localStorage.setItem("addGoodsList",JSON.stringify(data));
                        if(data){
                            this.showAddSwiper = true
                        }
                        this.addList = data
                        this.midOne = data[0].mid
                    }
                })
                
            } else {
                
            }
        },
        videoPlay(){
            // console.log(111)
            document.addEventListener("WeixinJSBridgeReady",function() { 
                document.getElementById('vido_one').play(); 
            }, false);
        }
    },

    mounted () {
        this.videoPlay();
        this.getBless();
        // this.getAddGoods() 
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
    .pop
        width 6.46rem
        height 4.2rem
        border-radius 0.32rem
        padding: 0.3rem;
        box-sizing: border-box;
        .form
            height 100%
            width 100%  
            margin 0 auto
            display flex
            justify-content center
            flex-direction column 
            align-items center
            box-sizing border-box
        .from_title
            font-size 0.32rem
            color #333
            font-weight 600
        .noticeCont
            width 100%
            font-size 0.32rem
            color #666
            margin-top 0.3rem
            text-align center
            line-height 0.38rem
</style>
