<template>
  <div id="myorder">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">我的订单</p>
    </div>
    <van-tabs sticky animated swipeable offset-top="46" v-model="active">
      <van-tab title="全部">
        <van-empty description="暂时还没有相关订单" :image="emptyImage" v-show="isEmpty">
        </van-empty>
      </van-tab>
      <van-tab title="待支付">
        <van-empty description="暂时还没有相关订单" :image="emptyImage" v-show="isEmpty">
        </van-empty>
      </van-tab>
      <van-tab title="待收货">
        <van-empty description="暂时还没有相关订单" :image="emptyImage" v-show="isEmpty">
        </van-empty>
      </van-tab>
      <van-tab title="待评价">
        <van-empty description="暂时还没有相关订单" :image="emptyImage" v-show="isEmpty">
        </van-empty>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      emptyImage: require("@/assets/images/mine/noData.jpeg"),
      isEmpty:true
    };
  },
  created() {
    if (this.$route.params.index) this.active = this.$route.params.index;
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  filters: {}
};
</script>

<style scoped>
#myorder {
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow-y: scroll;
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
/deep/ .van-tabs__content {
  padding-top: 0.5rem !important;
}
/deep/ .van-tabs__line {
  background-color: #3bba63 !important;
}

</style>