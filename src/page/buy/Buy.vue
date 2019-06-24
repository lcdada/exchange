<template>
  <div>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        @save="onSave"
        @delete="onDelete"
      />
  </div>
</template>

<script>
import {Card,button,Toast,AddressList,Popup,AddressEdit,Area} from 'vant'
import areaList from '../../assets/area.js'
export default {
  name:'Buy',
  components:{
    [AddressEdit.name]:AddressEdit
  },
  data() {
    return {
      areaList,
      searchResult: []
    }
  },

  methods: {
    onSave(data) {
      console.log(data)
      // Toast('保存成功');
      let gid = this.$utils.getUrlKey('gid')
      let params = {
          package_id:390,
          gid:gid,
          province:data.province,
          city:data.city,
          area:data.county,
          address:data.addressDetail
      }
      this.$api.home.getRegion({
         params:params
      }).then(params =>{
            if(params.data.code  == 1000){
                  // const data = params.data.data[0];
                  // console.log(data)
                  // this.Swiperpics = data.pics
                  // this.Msessage =data
                console.log(params)
              }
      })

    },
    onDelete() {
      Toast('已删除');
    },
    save(data){
     alert(111)
    }
  },
  
}

</script>
<style lang='stylus' scoped>
</style>