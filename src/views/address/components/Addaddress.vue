<template>
  <div id="userinfo">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">添加地址</p>
    </div>
    <div class="address">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { Toast,AddressEdit } from "vant";
import areaList from '../../../js/arealist'
export default {
  data() {
    return {
       areaList,
      searchResult: [],
      content:''
    };
  },
  created() {
  },
  methods: {
    goback() {
      this.$router.back(-1);
    },
    onSave(content) {
      let id = this.getID();
      content['id'] = id,
      content['address'] = content.province + content.city + content.county + content.addressDetail;
      this.$store.dispatch('addDeliveryaddress',content);
      this.$router.back(-1)
    },
    getID(){
      var date = new Date()
      return date.getTime()
    },
    onDelete() {
      Toast("delete");
    },
    // onChangeDetail(val) {
    //   if (val) {
    //     this.searchResult = [
    //       {
    //         name: "黄龙万科中心",
    //         address: "杭州市西湖区"
    //       }
    //     ];
    //   } else {
    //     this.searchResult = [];
    //   }
    // }
  },
  filters: {}
};
</script>

<style scoped>
#userinfo {
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #fff;
  height: 0.5rem;
  line-height: 0.5rem;
  z-index: 10;
}
.top-header p {
  font-size: 0.16rem;
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
  line-height: 0.5rem;
}
.goback {
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  color: teal;
  left: 0.2rem;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 0.2rem;
  font-size: 0.16rem;
}
.address {
  padding-top: 0.5rem;
}
.noaddress {
  position: relative;
  width: 100%;
  height: 100vh;
}
.noaddress .text {
  font-size: 0.16rem;
  color: #666;
}
.noaddress .imgbox {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.noaddress img {
  width: 220px;
}
.noaddress button{
  background-color: #45c763;
  border: 0;
  border-radius: 25px;
  font-size: 0.2rem;
  width: 70%;
  padding: 0.1rem 0;
  color: #fff;
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  margin: auto;
}
</style>