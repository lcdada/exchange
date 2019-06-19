<template>
    <div>
        <van-tabbar fixed  v-model="active" class="active_tab">
            <van-tabbar-item
                v-for="(item,index) in tabbars"
                :key="index"
                @click="tab(index,item.name)"
                >
                <span :class="currIndex == index ? active:''">{{item.title}}</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? item.active : item.normal">
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>    
</template>
<script>
import {  Tabbar, TabbarItem } from 'vant';
export default {
     components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem,
     },
     data() {
        return {
        currIndex: 0,
        active: 0,
        tabbars: [
            {
                name:'/',
                title:'首页',
                normal: require('./../assets/img/nohomepage.png'),
                active: require('./../assets/img/homepage.png')
            },
            {
                name:'test',
                title:'转增',
                normal: require('./../assets/img/notransferr.png'),
                active: require('./../assets/img/transferr.png')
            },{
                name:'cart',
                title:'购物车',
                normal: require('./../assets/img/nogoodscar.png'),
                active: require('./../assets/img/goodscar.png')
            },
            {
                name:'login',
                title:'我的订单',
                normal: require('./../assets/img/nomyorder.png'),
                active: require('./../assets/img/myorder.png')
            }

        ]}
    },
    methods: {
        tab(index, val) {
        this.currIndex = index;
        this.$router.push(val);
        }
  }
}
</script>
<style lang="stylus" scoped>
    .active_tab img 
        width: 0.52rem;
        height: 0.52rem;
</style>
