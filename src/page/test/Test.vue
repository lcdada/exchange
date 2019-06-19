<template>
    <div>
        <test-header></test-header>
        <keep-alive>
            <test-list :weekend="weekendList" ></test-list>
        </keep-alive>
        <goods-list></goods-list>
       
    </div>
</template>
<script>
import TestHeader from './components/Header'
import TestList from './components/List'
import GoodsList from './components/GoodsLIst'
export default {
    name:'Test',
    components:{
        TestHeader,
        TestList,
        GoodsList,
    data() {
        return {
        activeKey: 0
        }
    },
     methods: {
        onChange(key) {
        this.activeKey = key;
        }
    }
    },
    data (){
        return {
            weekendList:[]
        }
    },
     created:function () {
        this.$emit('public_header', false);
    },
    methods:{
        onLoad() {      
            this.$api.article.articleList({        
                api: 123      
            }).then(res=> {
                // 执行某些操作  
                res = res.data;
                if (res.ret && res.data) {
                    this.weekendList = res.data.weekendList
                }
            })    
        }
        // getGoods () {
        //     // let params = {
        //     //     package_id :530,
        //     // }
        //     this.$api.article.goodslist({
        //         package_id:530,
        //         pageindex:3
        //     }).then(params => {
                
        //     })
        // },
        // goodsdetial () {
        //     this.$api.article.goodsdetials({
               
        //     }).then(params => {
        //     })
        // }
    },
     mounted () {
         this.onLoad()
        //  this.getGoods()
        //  this.goodsdetial()  
    },  
}
</script>
<style lang="stylus" scoped>

</style>
