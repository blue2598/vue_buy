<template>
  <div class="login-box">
    <div class="login-wrapper">
      <img class="bear" :src="bearSrc" />
      <span class="close">
        <van-icon name="close" @click="closeFn()"/>
      </span>
      <div class="login">
        <van-tabs v-model="active">
          <van-tab title="登录">
            <transition name="van-slide-left">
              <van-form @submit="loginFn">
                <van-field
                  v-model="username"
                  name="手机号码"
                  label="手机号码"
                  placeholder="手机号码"
                  :rules="[{ required: true, message: '请填写手机号码' }]"
                />
                <van-field
                  v-model="password"
                  type="password"
                  name="验证码"
                  label="验证码"
                  placeholder="验证码"
                  :rules="[{ required: true, message: '请填写验证码' }]"
                />
                <div style="margin: 16px;">
                  <van-button round block type="info" native-type="submit">登录</van-button>
                </div>
                <div class="login-type">账号密码登录</div>
              </van-form>
            </transition>
          </van-tab>
          <van-tab title="注册">
            <transition name="van-slide-right">
              <van-form @submit="registerFn">
                <van-field
                  v-model="username"
                  name="手机号码"
                  label="手机号码"
                  placeholder="手机号码"
                  :rules="[{ required: true, message: '请填写手机号码' }]"
                />
                <van-field
                  v-model="password"
                  type="password"
                  name="密码"
                  label="密码"
                  placeholder="密码"
                  :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                  <van-button round block type="info" native-type="submit">登录</van-button>
                </div>
                <div class="login-type">验证码登录</div>
              </van-form>
            </transition>
          </van-tab>
        </van-tabs>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">其他登录方式</van-divider>
        <div class="other">
          <ul>
            <li>
              <img src="../assets/images/login/qq.png" />
              <div>QQ登录</div>
            </li>
            <li>
              <img src="../assets/images/login/wx.png" />
              <div>微信登录</div>
            </li>
          </ul>
        </div>
        <van-checkbox class="agree" name="1" shape="square">
          同意
          <b style="color:blue">用户协议</b>、
          <b style="color:blue">隐私策略</b>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      username: "",
      password: "",
      bearSrc: "../assets/images/login/normal.png"
    };
  },
  methods: {
    closeFn() {
      this.$router.back();
    },
    loginFn() {},
    registerFn() {}
  }
};
</script>
<style scoped>
.login-box {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background: url("../assets/images/login/back.jpg") center / 100% 100%;
}
.login-wrapper {
  width: 90%;
  height: 70%;
  margin: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 10px;
}
.bear {
  width: 100px;
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  margin: auto;
}
.close i {
  font-size: 0.25rem;
  position: absolute;
  right: 10px;
  top: 10px;
  color: rgb(173, 173, 173);
}
.login {
  padding: 0 20px;
  padding-top: 40px;
}
.login-type {
  font-size: 0.15rem;
  color: #000;
  padding: 10px 16px;
}
.other ul {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}
.other ul li {
  width: 50%;
  font-size: 0;
  vertical-align: middle;
  text-align: center;
  padding: 10px 0;
}
.other ul li div {
  font-size: 0.12rem;
  color: #999;
  padding: 5px 0;
}
.other ul li img {
  width: 30px;
}
.agree {
  padding: 15px 0;
  font-size: 0.14rem;
}
</style>