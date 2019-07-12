<template>
  <div>
      <div>
          <img src="" alt="">
      </div>
      <div>
          <video src=""></video>
      </div>
      <div>
          <p class="to" >{{to_user}}</p>
          <p class="text"></p>
          <p class="from"></p>
      </div>
      <home :package="package_id" :list="goods_list" :bless="bless_info" :flag="flag"></home>
  </div>
</template>

<script>
import Home from './../homepage/Home'
export default {
    name:'Preview',
    components:{
        Home,
    },
    data() {
        return {
            to_user:'',
            bless_info:{},
            goods_list:[],
            exchange_num:'',
            package_id:'',
            flag:false
        }
    },
    created() {
        const to_user = localStorage.getItem("to_user")
        console.log(to_user );
        
        
    },
}

</script>
<style lang='stylus' scoped>
</style>