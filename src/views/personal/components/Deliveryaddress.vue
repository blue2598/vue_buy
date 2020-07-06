<template>
  <div id="userinfo">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">{{title}}</p>
    </div>
    <div class="address">
      <div class="hasaddress" v-if="hasAddress"></div>
      <div class="noaddress">
        <div class="imgbox">
          <img src="../../../assets/images/mine/noaddress.png" />
          <div class="text">还没有添加地址哦，快去添加一个吧</div>
        </div>
        <button @click="goChildren('addaddress')">添加地址</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      title: "添加地址",
      hasAddress: false
    };
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goChildren(name){
      this.$router.push({name})
    },
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
.noaddress .text{
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
.noaddress button {
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