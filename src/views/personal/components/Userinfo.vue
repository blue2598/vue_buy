<template>
  <div id="userinfo">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">个人资料</p>
    </div>
    <div class="details">
      <div class="item">
        <van-cell title="头像">
          <template #right-icon>
            <img
              class="avator"
              v-if="userinfo.sex=='1'"
              src="../../../assets/images/mine/girl.png"
              width="90"
              height="90"
            />
            <img
              class="avator"
              v-else
              src="../../../assets/images/mine/boy.png"
              width="90"
              height="90"
            />
          </template>
        </van-cell>
        <van-cell title="昵称" is-link @click="showName = true" :value="userinfo.name" />
        <van-dialog v-model="showName" title="修改用户名" show-cancel-button @confirm="updatename">
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" />
        </van-dialog>
        <van-cell title="性别" is-link @click="showSex = true" :value="userinfo.sex=='1'?'女':'男'" />
        <van-action-sheet v-model="showSex" title="性别">
          <div class="content">
            <van-radio-group v-model="userinfo.sex">
              <van-cell-group @click="updatesex(radio)">
                <van-cell title="男" clickable @click="radio = '0'">
                  <template #right-icon>
                    <van-radio name="0" />
                  </template>
                </van-cell>
                <van-cell title="女" clickable @click="radio = '1'">
                  <template #right-icon>
                    <van-radio name="1" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </van-action-sheet>
        <van-cell title="生日" is-link @click="showBirthday = true" :value="userinfo.birthday | birthFormat" />
        <van-action-sheet v-model="showBirthday" title="标题">
          <div class="content">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </div>
        </van-action-sheet>
        <van-cell
          title="手机号"
          is-link
          @click="showPhone = true"
          :value="userinfo.phone | phoneFormat"
        />
        <van-dialog v-model="showPhone" title="修改手机号" show-cancel-button>
          <van-field v-model="phone" name="手机号" label="手机号" placeholder="手机号" />
        </van-dialog>
      </div>
    </div>
    <div class="out">
      <van-button type="primary" size="large" @click="logout()">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      showName: false,
      showSex: false,
      showBirthday: false,
      showPhone: false,
      sex: "1",
      username: "",
      phone: "",
      sex: null
    };
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    logout() {
      Dialog.confirm({
        message: "确认退出登录吗"
      })
        .then(() => {
          this.$router.push("/login");
          this.$store.dispatch("removeUserinfo");
          this.$store.dispatch("removeShopcart");
        })
        .catch(() => {
          // on cancel
        });
    },
    updatename() {
      if (this.username) {
        this.$store.dispatch("updateUsername", this.username);
        Toast("修改成功");
      }
    },
    updatesex(sex) {
      setTimeout(() => {
        (this.showSex = false), this.$store.dispatch("updateUsersex", sex);
        Toast("修改成功");
      }, 1000);
    }
  },
  filters: {
    phoneFormat(val) {
      var tel = val.replace(val.substring(3, 7), "****");
      return tel;
    },
    birthFormat(val){
      var bir = val.substring(0,10)
      return bir
    }
  }
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
.avator {
  width: 0.3rem;
  height: 0.3rem;
}
</style>