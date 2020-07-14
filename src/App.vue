<template>
  <div id="app">
    <BackToTop></BackToTop>
    <router-view></router-view>
  </div>
</template>

<script>
import BackToTop from "./components/BackToTop";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    BackToTop
  },
  mounted() {
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    // window.addEventListener(
    //   "hashchange",
    //   () => {
    //     let currentPath = window.location.hash.slice(1);
    //     if (this.$route.path !== currentPath) {
    //       name = currentPath.substring(1)
    //       this.$router.push({name:name});
    //     }
    //   },
    //   false
    // );
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  created() {
    this.init_userinfo();
    this.init_shopcart();
    this.init_deliveryaddress();
  },
  methods: {
    init_userinfo() {
      var userinfoLocal = localStorage.getItem("userinfo");
      if (userinfoLocal) {
        this.$store.dispatch("curUserinfo", JSON.parse(userinfoLocal));
      }
    },
    init_shopcart() {
      var shopcartLocal = localStorage.getItem("shopcart");
      if (shopcartLocal) {
        this.$store.dispatch("init_shopcart", JSON.parse(shopcartLocal));
      }
    },
    init_deliveryaddress() {
      var deliveryaddress = localStorage.getItem("deliveryaddress");
      if (deliveryaddress) {
        this.$store.dispatch(
          "init_deliveryaddress",
          JSON.parse(deliveryaddress)
        );
      }
    }
  }
};
</script>

<style>
body {
  /* overflow-y: scroll; */
  /* overflow: hidden; */
  /* overflow-x: hidden; */
}
body::-webkit-scrollbar {
  display: none;
}
</style>
