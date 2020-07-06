<template>
  <div id="mine">
    <div class="m-header" v-if="!isLogin">
      <div class="top">我的</div>
      <img src="../../assets/images/mine/icon-test.png" width="90" height="90" />
      <div class="text" @click="loginFn()">立即登录</div>
    </div>
    <div class="m-header" v-else>
      <div class="top">我的</div>
      <img v-if="userinfo.sex=='1'" src="../../assets/images/mine/girl.png" width="90" height="90" />
      <img v-else src="../../assets/images/mine/boy.png" width="90" height="90" />
      <div class="text" @click="userinfoDetails(userinfo)">
        <div class="username">{{userinfo.name}}</div>
        <div class="phone">手机号：{{userinfo.phone}}</div>
      </div>
    </div>
    <div class="m-con">
      <van-cell-group>
        <van-cell title="我的订单" is-link @click="goChildren('order')" value="查看全部订单" icon="label" />
        <van-cell class="op-cell">
          <ul class="op-list">
            <li @click="goOrder(1)">
              <van-icon name="paid" badge="0" />
              <span class>待支付</span>
            </li>
            <li @click="goOrder(2)">
              <van-icon name="gift-o" badge="9" />
              <span class>待收货</span>
            </li>
            <li @click="goOrder(3)">
              <van-icon name="smile-comment-o" badge="9" />
              <span class>待评价</span>
            </li>
            <li>
              <van-icon name="after-sale" badge="9" />
              <span class>售后/退款</span>
            </li>
          </ul>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="我的优惠券" is-link @click="goChildren('coupon')" icon="bill" />
        <van-cell title="我的收货地址" is-link @click="goChildren('deliveryaddress')" icon="setting" />
      </van-cell-group>

      <van-cell-group>
        <van-cell title="我的绿卡" is-link @click="goChildren('myvip')" icon="vip-card" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="联系客服" is-link @click="goChildren('myvip')" value="客服时间07:00-22:00" icon="phone-circle" />
        <van-cell title="意见反馈" is-link @click="goChildren('feedback')" icon="comment-circle" />
      </van-cell-group>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    loginFn() {
      this.$router.push("/login");
    },
    userinfoDetails(list) {
      this.$router.push({name: "userinfo", params: { list }});
    },
    goChildren(name){
      console.log(name)
      this.$router.push({name})
    },
    goOrder(index){
      this.$router.push({name:"order",params:{index:index}})
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      userinfo: state => state.userinfo
    })
  }
};
</script>
<style scoped>
.m-header {
  padding: 10px 0;
  background-color: #3bba63;
}
.m-header img {
  border-radius: 50%;
  margin-left: 15px;
  vertical-align: middle;
}
.top {
  color: #fff;
  font-size: 0.16rem;
  text-align: center;
  /* margin-bottom: 20px; */
}
.text {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  font-size: 0.15rem;
}
.text div {
  padding: 5px 0;
}
.op-cell {
  padding: 10px 0;
}
.op-list {
  width: 100%;
  height: 70px;
}
.op-list li {
  padding: 10px 0;
  width: 25%;
  float: left;
  text-align: center;
  color: #7d7e80;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.op-list li i {
  font-size: 0.25rem;
}
.m-con {
  background-color: #f5f5f5;
}
.van-icon.van-icon-label {
  color: #3bba63;
  font-size: 0.2rem;
}
.van-icon.van-icon-bill {
  color: #3bba63;
  font-size: 0.2rem;
}
.van-icon.van-icon-setting {
  color: #3bba63;
  font-size: 0.2rem;
}
.van-icon.van-icon-phone-circle {
  color: #3bba63;
  font-size: 0.2rem;
}
.van-icon.van-icon-vip-card {
  color: #3bba63;
  font-size: 0.2rem;
}
.van-icon.van-icon-comment-circle {
  color: #3bba63;
  font-size: 0.2rem;
}
.van-cell-group {
  margin-bottom: 10px;
}
</style>