<template>
    <div class="detail">
        <detail-banner :Spics="Swiperpics" :message='Msessage'></detail-banner>
        <detail-conent :message='Msessage' :flag = 'flag'></detail-conent>
    </div>
</template>
<script>
    import DetailBanner from './components/Banner'
    import DetailConent from './components/Conent'
    import {  Tabbar, TabbarItem } from 'vant';
    import utils from '../../utils/utils'
    export default {
        name:'Detail',
        data (){
            return {
                Swiperpics:[],
                Msessage:{},
                flag:"",
                addPriceId:utils.getUrlKey('addPriceId'),
                package_id:utils.getUrlKey('package_id'),

            }
        },
        components:{
            DetailBanner,
            DetailConent,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
        watch: {
              $route(){
                this.init()
            },
        },  
        methods:{
            init () {
                let id = this.$route.query.id
                let mid = localStorage.getItem("mid")
                this.$api.home.getGoodsDetail({
                    goods_id:id,
                    markup_id:mid

                }).then(params =>{
                    if(params.data.code  == 1000){
                        const data = params.data.data[0];
                        this.Swiperpics = data.pics
                        this.Msessage =data

                    }
                })
            },
            getGoodsNotice(){
                let id = this.$route.query.id
                this.$api.home.getGoodsNotice({
                    gid:id
                   
                }).then(params =>{
                    if(params.data.code  == 1000){
                        if(params.data.data.hasOwnProperty("post_content") && params.data.data.post_content.length > 0){
                            alert(params.data.data.post_content)
                        }

                    }
                })
            },
            getNoSkuInfo(){
                let id = this.$route.query.id
                this.$api.home.getNoSkuInfo({
                    gid:id
                }).then(params =>{
                    if(params.data.code  == 1000){
                        if(params.data.data.notice.type != "" && params.data.data.notice.type == 5) {
                            if(params.data.data.notice.type == 5) {
                                alert(params.data.data.notice.post_content);

                                if(params.data.data.notice.status != 1) {
                                    this.flag = false
                                }
                            }
                        }
                    }
                })
            }
        },
        mounted () {
            this.init(),
                this.getGoodsNotice(),
                this.getNoSkuInfo()

        },
    }
</script>
<style lang="stylus" scoped>
    .detail
        background #fff
        padding-bottom 1.4rem
</style>
