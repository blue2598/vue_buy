<template>
  <div class="login-box">
    <div class="login-wrapper">
      <img class="bear" :src="bearSrc" />
      <span class="close">
        <van-icon name="close" @click="closeFn()" />
      </span>
      <div class="login">
        <van-tabs v-model="active">
          <van-tab title="登录">
            <van-form @submit="loginFn" v-show="showPanel">
              <van-field
                clearable
                v-model="phonenum"
                maxlength="11"
                name="手机号码"
                label="手机号码"
                placeholder="手机号码"
                @click="changeBear(1)"
              />
              <van-field
                v-model="Vcode"
                clearable
                type="number"
                name="验证码"
                label="验证码"
                placeholder="验证码"
                @click="changeBear(0)"
              >
                <van-button
                  slot="button"
                  :disabled="false"
                  type="primary"
                  size="small"
                  native-type="button"
                  @click="sendCode()"
                  v-if="this.checkPhoneNum()"
                >发送验证码</van-button>
                <van-button
                  slot="button"
                  :disabled="true"
                  type="primary"
                  size="small"
                  native-type="button"
                  v-else
                >发送验证码</van-button>
              </van-field>
              <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">登录</van-button>
              </div>
              <div class="login-type" @click="changeLoginType()">账号密码登录</div>
            </van-form>
            <van-form @submit="loginFn" v-show="!showPanel">
              <van-field
                clearable
                v-model="phonenum"
                maxlength="11"
                name="手机号码"
                label="手机号码"
                placeholder="手机号码"
                @click="changeBear(1)"
              />
              <van-field
                v-model="password"
                clearable
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                @click="changeBear(2)"
              ></van-field>
              <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">登录</van-button>
              </div>
              <div class="login-type" @click="changeLoginType()">{{typeText}}</div>
            </van-form>
          </van-tab>
          <van-tab title="注册">
            <van-form @submit="registerFn">
              <van-field
                v-model="phonenum"
                name="手机号码"
                @click="changeBear(1)"
                label="手机号码"
                placeholder="手机号码"
              />
              <van-field
                v-model="regPassword"
                @focus="closeEye()"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                @click="changeBear(2)"
              />
              <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">注册</van-button>
              </div>
            </van-form>
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
        <van-field name="checkbox" label>
          <template #input>
            <van-checkbox class="agree" v-model="agree" name="1" shape="square">
              同意
              <b style="color:blue">用户协议</b>、
              <b style="color:blue">隐私策略</b>
            </van-checkbox>
          </template>
        </van-field>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import { getVerifyCode,getUserinfo } from "../axios/api";
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      active: 0,
      typeText: "账号密码登录",
      phonenum: "",
      password: "",
      username: "",
      regPassword: "",
      verifyCode: "", //验证码
      Vcode: "",
      agree: false,
      loginType: 0, //0是验证码登录，1是密码登录
      showPanel: true, //切换验证码登录和密码登录
      verifyButton: true, //发送验证码按钮禁用状态
      bearSrc: require("@/assets/images/login/normal.png")
    };
  },
  computed:{
    ...mapState({
      userinfo:state=>state.userinfo
    })
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  methods: {
    closeFn() {
      this.$router.back();
    },
    //手机号码验证
    checkPhoneNum() {
      return (this.verifyButton = /^1(3|4|5|6|7|8|9)\d{9}$/.test(
        this.phonenum
      ));
    },
    //发送验证码
    async sendCode() {
      const response = await getVerifyCode();
      if (response.message == "success") {
        this.verifyCode = response.data.code;
        Dialog.alert({
          title: "验证码",
          message: "验证码是" + this.verifyCode
        }).then(() => {
          // on close
        });
      }
    },
    // 检查验证码输入是否正确
    checkVerifyCode() {
      return this.verifyCode == this.Vcode;
    },
    //登录
   async loginFn() {
      if (this.loginType) {
        //账号密码登录
        if (!this.checkPhoneNum()) {
          Toast("请输入正确的手机号码");
          return;
        }
      } else {
        //验证码登录
        if (!this.checkPhoneNum()) {
          Toast("请输入正确的手机号码");
          return;
        }
        if (!this.Vcode) {
          Toast("请输入验证码");
          return;
        }
        if (!this.checkVerifyCode()) {
          Toast("验证码不正确");
          return;
        }
        if (!this.agree) {
          Toast({'message':"请勾选同意用户协议、隐私策略",'position':'center'});
          return;
        }
        if (this.checkPhoneNum() && this.checkVerifyCode()&&this.agree) {
          this.$store.state.isLogin = true;
          let ref = await getUserinfo(this.phonenum);
          this.$store.dispatch("curUserinfo", ref.data.userInfo);
          this.$router.back();
        }
      }
    },
    //切换登录方式
    changeLoginType() {
      this.showPanel = !this.showPanel;
      this.typeText = this.showPanel ? "账号密码登录" : "手机验证码登录";
      this.loginType = this.showPanel ? 0 : 1;
    },
    //小熊
    changeBear(index) {
      switch(index){
        case 0 :this.bearSrc = require("@/assets/images/login/normal.png");break;
        case 1 :this.bearSrc = require("@/assets/images/login/greeting.png");break;
        case 2 :this.bearSrc = require("@/assets/images/login/blindfold.png");break;
        default : this.bearSrc = require("@/assets/images/login/normal.png")
      }
    },
    openEye() {
      this.bearSrc = require("@/assets/images/login/greeting.png");
    },
    //注册
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
  height: 75%;
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