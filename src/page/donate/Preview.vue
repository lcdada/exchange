<template>
  <div>
      <div>
          <img src="" alt="">
      </div>
      <div>
          <video src=""></video>
      </div>
      <div>
          <p class="to">{{this.to_user}}</p>
          <p class="text"></p>
          <p class="from"></p>
      </div>
      <div>
		  <ul>
			  <li>
				  
			  </li>
		  </ul>
      </div>  
  </div>
</template>

<script>
export default {
    name:'Preview',
    data() {
        return {
            to_user:''
        }
    },
    created() {
        let to_user = localStorage.getItem("to_user")
        // console.log(to_user );
        
        
    },
}

</script>
<style lang='stylus' scoped>
</style>