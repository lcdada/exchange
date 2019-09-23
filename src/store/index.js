import Vuex from 'vuex'
import Vue from 'vue'
import {  Toast  } from 'vant';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// store.js
export default new Vuex.Store({
    state: {
        carList: [], //购物车的商品
        // exchangeNum :3,
        // count:0,
        nowlist:[],//立即购买
    },
    plugins: [createPersistedState()],
    mutations: {
        // 加
        addCar(state, params) {
            let jid = localStorage.getItem("jid");
            let exchange_num = localStorage.getItem("exchange_num"+jid);
            let alreadyNum = 0;
            let CarCon = state.carList;

            for(let i in CarCon)
            {
                alreadyNum += parseInt(CarCon[i].num);

                if(alreadyNum >= exchange_num) {
                    // state.count ++
                    Toast("你最多可以兑换"+exchange_num+"款商品");
                    return false;
                }
            }

            // 判断如果购物车是否有这个商品，有就只增加数量，否则就添加一个  维护一个购物车数量
            // some 只要有一个isHas为true,就为true
            let isHas = CarCon.some((item) => {
                if (params.id == item.id) {
                    item.num++;
                    return true;
                } else {
                    return false;
                }
            })

            if (!isHas) {
                let obj = {
                    "goods_name":params.goods_name,
                    "id": params.id,
                    "title": params.class_name,
                    "price": params.market_price,
                    "picture":params.thumb,
                    "num": 1,
                    "addprice":params.markup_price
                }
                this.state.carList.push(obj)
            }
        },
        // 立即购买添加
        nowAddCar(state,params) {
            console.log(params)
            this.state.nowlist=[]
            let obj = {
                    "goods_name":params.goods_name,
                    "id": params.id,
                    "title": params.class_name,
                    "price": params.market_price,
                    "picture":params.thumb,
                    "num": 1,
                    "addprice":params.markup_price
                }
                this.state.nowlist.push(obj)
        },
        // 减
        reducedCar(state,params){
            let len=state.carList.length;
            for(var i=0;i<len;i++){
                if(state.carList[i].id==params.id){
                    state.carList[i].num--
                    if(state.carList[i].num==0){
                        state.carList.splice(i,1);
                        break;
                    }
                }
            }
        },
        //移出
        deleteCar(state,params){
            let len=state.carList.length;
            for(var i=0;i<len;i++){
                if(state.carList[i].id==params.id){
                    state.carList.splice(i,1);
                    break;
                }
            }
        },
        // 立即购买 移除
        nowDeleteCar(state,params){
            let len=state.nowlist.length;
            for(var i=0;i<len;i++){
                if(state.nowlist[i].id==params.id){
                    state.nowlist.splice(i,1);
                    break;
                }
            }
        },

        newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
            state.exchangeNum+=sum;
         }

    },
    actions: {
        // 加
        addCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("addCar", params)
                }
            }, 100)
        },
        // 立即购买 加
        nowAddCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("nowAddCar", params)
                }
            }, 100)
        },
        // 减
        reducedCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("reducedCar", params)
                }
            }, 100)
        },
        // 移出
        deleteCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("deleteCar", params)
                }
            }, 100)
        },
        // 立即购买 移除
        nowDeleteCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("nowDeleteCar", params)
                }
            }, 100)
        },
        // initCar({ commit }) {
        //     setTimeout(function () {
        //         let result = 'ok'
        //         if (result == 'ok') {
        //             // 提交给mutations
        //             commit("initCar", [{
        //                 "id": 20193698,
        //                 "title": '我是购物车原来的',
        //                 "price": 30,
        //                 "num": 100,
        //             }])
        //         }
        //     }, 100)
        // }
        getNewNum(context,num){   //同上注释，num为要变化的形参
            context.commit('newNum',num)
         }
    },
    getters: {
        //返回购物车的总价
        totalPrice(state) {
            let Carlen = state.carList;
            let money = 0;
            if (Carlen.length != 0) {
                Carlen.forEach((item) => {
                    money += item.score * item.num
                })
                return money;
            } else {
                return 0;
            }
        },
        totalPrice1(state) {
            let Carlen = state.nowlist;
            let money = 0;
            if (Carlen.length != 0) {
                Carlen.forEach((item) => {
                    money += item.score * item.num
                })
                return money;
            } else {
                return 0;
            }
        },
         //加价购返回购物车的总价
         addtotalPrice(state) {
            let Carlen = state.carList;
            let money = 0;
            if (Carlen.length != 0) {
                Carlen.forEach((item) => {
                    money += item.addprice * item.num
                })
                return money;
            } else {
                return 0;
            }
        },
        addtotalPrice1(state) {
            let Carlen = state.nowlist;
            let money = 0;
            if (Carlen.length != 0) {
                Carlen.forEach((item) => {
                    money += item.addprice * item.num
                })
                return money;
            } else {
                return 0;
            }
        },
        //返回购物车的总数
        carCount(state) {
            return state.carList.length
        },
        //可兑换数量
        getExchangeNum(state){  //承载变化的changebleNum的值
            return state.exchangeNum
         }
    },
})
