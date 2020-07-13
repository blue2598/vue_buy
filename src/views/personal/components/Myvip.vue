<template>
  <div id="myvip">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">绿卡</p>
    </div>
    <div class="details">
      <div class="img">
        <img src="../../../assets/images/mine/vip.png" />
      </div>
      <div class="special">
        <div class="title">绿卡特权</div>
        <div class="content">
          <div class="item">
            <div class="icon">
              <van-icon name="vip-card-o" />
            </div>
            <div class="item-text">专享券</div>
          </div>
          <div class="item">
            <div class="icon">
              <van-icon name="discount" />
            </div>
            <div class="item-text">专享特价</div>
          </div>
          <div class="item">
            <div class="icon">
              <van-icon name="gem-o" />
            </div>
            <div class="item-text">2倍积分</div>
          </div>
          <div class="item">
            <div class="icon">
              <van-icon name="more-o" />
            </div>
            <div class="item-text">更多特权</div>
          </div>
        </div>
      </div>
      <div class="button">
        <button>5折开通绿卡</button>
      </div>
      <div class="coupon">
        <div class="title">
          <span class="listnum">1</span>绿卡专享券 天天领取优惠
        </div>
        <span class="subtitle-1">今日专享券</span>
        <span class="subtitle-2">每天零点更新</span>
        <div class="coupon-box">
          <div class="item">
            <div class="left">
              <div class="line-1">
                <span>￥</span>
                <span>6</span>
              </div>
              <div class="line-2">满49元使用</div>
              <div class="line-3">全国通用</div>
            </div>
            <div class="right">立即领取</div>
          </div>
        </div>
        <span class="subtitle-1">本周专享券</span>
        <div class="coupon-box">
          <div class="item">
            <div class="left">
              <div class="line-1">
                <span>￥</span>
                <span>6</span>
              </div>
              <div class="line-2">满49元使用</div>
              <div class="line-3">全国通用</div>
            </div>
            <div class="right">立即领取</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="line-1">
                <span>￥</span>
                <span>6</span>
              </div>
              <div class="line-2">满49元使用</div>
              <div class="line-3">全国通用</div>
            </div>
            <div class="right">立即领取</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="line-1">
                <span>￥</span>
                <span>6</span>
              </div>
              <div class="line-2">满49元使用</div>
              <div class="line-3">全国通用</div>
            </div>
            <div class="right">立即领取</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="line-1">
                <span>￥</span>
                <span>6</span>
              </div>
              <div class="line-2">满49元使用</div>
              <div class="line-3">全国通用</div>
            </div>
            <div class="right">立即领取</div>
          </div>
        </div>
      </div>
      <div class="coupon">
        <div class="title">
          <span class="listnum">2</span>绿卡专享券 天天领取优惠
        </div>
        <div class="contentBox">
          <div class="leftBox">
            <div class="leftBoxTitle">
              您当前购物返积分为
              <i>1倍</i>
            </div>
          </div>
          <div class="rightBox">
            <div class="rightBoxTitle">
              开通绿卡购物返积分为
              <i>2倍</i>
            </div>
          </div>
          <div class="line"></div>
          <img class="rocket" src="../../../assets/images/mine/rockets.png" alt />
        </div>
        <div class="button">
          <button>立即开启积分加速</button>
        </div>
      </div>
      <div class="coupon">
        <div class="title">
          <span class="listnum">2</span>绿卡专享特权
        </div>
        <div class="content list">
          <van-tabs sticky animated swipeable offset-top="47">
            <van-tab title="全部">
              <ul>
                <li v-for="(item,index) in goodlists" :key="index">
                  <div class="imgbox">
                    <img :src="item.small_image" />
                  </div>
                  <div class="contentbox">
                    <div class="name">{{item.product_name}}</div>
                    <div class="desc">{{item.spec}}</div>
                    <div class="price">
                      <span class="now_price">{{item.price | priceFormat}}</span>
                      <span class="old_price">{{item.origin_price | priceFormat}}</span>
                      <span class="shopcart">
                        <i class="iconfont icon-gouwuche" />
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { getListdetails } from "../../../axios/api";
export default {
  data() {
    return {
      goodlists: []
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    async getRecommend() {
      var type = "cate00";
      const t1 = Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      const res2 = await getListdetails(type);
      if (res2.message == "success") {
        t1.clear();
        this.goodlists = res2.data.goodlist.list;
      }
    },
    logout() {
      Dialog.confirm({
        message: "确认退出登录吗"
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  filters: {
    priceFormat(value) {
      return "￥" + value;
    }
  }
};
</script>

<style scoped>
#myvip {
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  font-size: 0;
}
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #303747;
  height: 0.5rem;
  line-height: 0.5rem;
  z-index: 10;
  color: #fff;
}
.top-header p {
  font-size: 0.16rem;
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
  line-height: 0.5rem;
  color: #fff;
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
  height: calc(100% - 0.5rem);
  overflow-y: scroll;
}
.img {
  border-top: 1px solid #fff;
}
.img img {
  width: 100%;
}

.details .title {
  color: #111;
  font-size: 0.2rem;
  font-weight: 700;
  padding: 0.1rem 0 0 0.15rem;
}
.special .content {
  font-size: 0;
  padding: 0.1rem 0;
}
.special .content .item {
  width: 25%;
  display: inline-block;
  text-align: center;
}
.special .content .item .icon {
  font-size: 0.3rem;
  color: #111;
}
.special .content .item .item-text {
  font-size: 0.16rem;
  color: #111;
}
.button {
  padding: 0.1rem;
  text-align: center;
}
.button button {
  background-color: #303747;
  border: 0;
  border-radius: 25px;
  font-size: 0.2rem;
  width: 70%;
  padding: 0.1rem 0;
  color: #3bba63;
  font-weight: 700;
  margin: 0 auto;
}
.coupon .title span.listnum {
  display: inline-block;
  width: 0.22rem;
  height: 0.25rem;
  line-height: 0.25rem;
  color: #fff;
  font-weight: 700;
  font-size: 0.16rem;
  border-radius: 5px;
  background-color: #3bba63;
  text-align: center;
  margin-right: 0.15rem;
  vertical-align: middle;
}
.coupon-box {
  padding: 0.1rem;
}
.coupon-box .item {
  width: 44%;
  margin-left: 3%;
  border-top: 1px solid #3bba63;
  border-bottom: 1px solid #3bba63;
  border-left: 1px dashed #3bba63;
  display: inline-block;
  margin-bottom: 0.1rem;
  height: 0.85rem;
}
.coupon span.subtitle-1 {
  font-size: 0.15rem;
  color: #111;
  display: inline-block;
  margin: 0.1rem 0 0 0.15rem;
}
.coupon span.subtitle-2 {
  font-size: 0.15rem;
  color: #999;
  display: inline-block;
  margin: 0.1rem 0.15rem;
}

.coupon-box .item .left {
  width: 75%;
  background-color: #fff;
  display: inline-block;
  height: 100%;
  vertical-align: bottom;
  padding: 0 5%;
  height: 100%;
}
.coupon-box .item .right {
  width: 15%;
  background-color: #3bba63;
  font-size: 0.16rem;
  display: inline-block;
  text-align: center;
  color: #fff;
  vertical-align: bottom;
  height: 100%;
}
.coupon-box .item .left .line-1 {
  color: #3bba63;
}
.coupon-box .item .left .line-1 span:nth-child(1) {
  font-size: 0.18rem;
  vertical-align: bottom;
}
.coupon-box .item .left .line-1 span:nth-child(2) {
  font-size: 0.3rem;
  vertical-align: bottom;
  font-weight: 700;
}
.coupon-box .item .left .line-2 {
  font-size: 0.14rem;
  color: #999;
}
.coupon-box .item .left .line-3 {
  font-size: 0.16rem;
  color: #3bba63;
}
.contentBox {
  width: 100%;
  height: 1rem;
  font-size: 0.16rem;
  position: relative;
}
.contentBox .leftBox {
  position: absolute;
  width: 50%;
  left: 0.15rem;
  top: 0.2rem;
  height: 0.8rem;
  background-color: #fff;
  background-color: #dbdbdb;
  border-radius: 5px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
  text-align: left;
}
.contentBox .leftBoxTitle {
  width: 50%;
  padding-top: 0.1rem;
  padding-left: 0.2rem;
  font-size: 0.12rem;
  color: #111;
}
.contentBox .rightBoxTitle {
  width: 50%;
  padding-top: 0.1rem;
  padding-left: 0.65rem;
  font-size: 0.12rem;
  color: #111;
  text-align: right;
}
.contentBox i {
  font-size: 0.2rem;
}
.contentBox .rightBox {
  position: absolute;
  width: 50%;
  right: 0.15rem;
  top: 0.2rem;
  height: 0.8rem;
  background-color: #fff;
  background-color: #6bee66;
  border-radius: 5px;
  clip-path: polygon(25% 0 , 100% 0, 100% 100%, 0 100%);
} 
.contentBox .line{
  width: 80%;
  position: absolute;
  height: 0.1rem;
  border-radius: 10px;
  bottom: 0.08rem;
  left: 50%;
  transform: translateX(-50%);
  background-image: linear-gradient(to left, #fbec53, #7affaf);;
}
.contentBox .rocket{
  position: absolute;
  right: 0;
  top:0;
}
.list ul li {
  padding: 0.05rem 0.1rem;
  border-bottom: 1px solid #ccc;
}
.list .imgbox {
  width: 26%;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.list .imgbox img {
  width: 100%;
}
.list .contentbox {
  width: 74%;
  display: inline-block;
}
.list .contentbox .name {
  font-size: 0.16rem;
  padding: 5px 0 5px 5px;
}
.list .contentbox .desc {
  font-size: 0.15rem;
  color: #999;
  padding-left: 5px;
}
.price {
  padding: 5px 0 10px 5px;
  position: relative;
}
.now_price {
  color: rgb(226, 31, 31);
  font-size: 0.18rem;
}
.old_price {
  color: #999;
  font-size: 0.14rem;
  text-decoration: line-through;
}
.shopcart {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.1rem;
  margin: auto;
  height: 0.3rem;
  line-height: 0.3rem;
  width: 0.3rem;
  background-color: #d7d7d7;
  color: #fff;
  text-align: center;
  border-radius: 50%;
}
.shopcart i {
  font-size: 0.18rem;
}
/deep/ .van-tabs__line {
  background-color: #3bba63;
}
</style>