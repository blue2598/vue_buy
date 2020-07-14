<template>
  <div id="userinfo">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">我的优惠券</p>
    </div>
    <van-coupon-list :coupons="coupons" @change="onChange" @exchange="onExchange" />
  </div>
</template>

<script>
import { Dialog } from "vant";
const coupon = [
  {
    available: 1,
    condition: "无使用门槛\n最多优惠12元",
    reason: "",
    value: 150,
    name: "优惠券名称",
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: "1.5",
    unitDesc: "元"
  },
  {
    available: 1,
    condition: "无使用门槛\n最多优惠12元",
    reason: "",
    value: 150,
    name: "优惠券名称",
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: "1.5",
    unitDesc: "元"
  }
];
export default {
  data() {
    return {
      showList: true,
      chosenCoupon: -1,
      coupons: coupon,
      disabledCoupons: coupon
    };
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  },
  filters: {}
};
</script>

<style scoped>
#userinfo {
  background-color: #f5f5f5;
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
.details {
  background-color: #fff;
  padding-top: 0.5rem;
}
/deep/ .van-coupon .van-checkbox,
/deep/ .van-coupon-list__bottom {
  display: none;
}
</style>