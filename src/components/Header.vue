<template>
    <div>
         <div class="content">
           <van-nav-bar title="标题">
                <van-icon name="bars" slot="left" @click="handleMaskClick"/>
              <!-- <van-icon name="bars" slot="left"/> -->
              <van-icon name="bag-o" slot="right" />
           </van-nav-bar>
        </div>
    </div>
</template>
<script>
import { NavBar,Icon} from "vant";
export default {
  name: "HomePage",
  components: {
    [NavBar.name]:NavBar,
    [Icon.name]:Icon
  },
  methods:{
    handleMaskClick(){
      console.log(1111)
      this.$refs.drawer.toggle();
    }
  }
 
};
</script>
<style lang="stylus" scoped>
   
</style>
