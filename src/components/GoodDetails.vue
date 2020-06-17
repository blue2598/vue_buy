<template>
  <div id="gooddetail">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">商品详情</p>
    </div>
    <div class="details">
      <div class="item">
        <div class="good-img">
          <img :src="goodDetails.small_image" />
        </div>
        <div class="good-info">
          <div class="info-title">{{goodDetails.name}}</div>
          <div class="info-spec">{{goodDetails.spec}}</div>
          <div class="info-price">
            <span class="now_price">{{goodDetails.price | priceFormat}}</span>
            <span class="old_price">{{goodDetails.origin_price | priceFormat}}</span>
            <span class="saled_num">已售：{{goodDetails.total_sales}}</span>
          </div>
          <div class="des">
            <i class="iconfont icon-tianping"></i>此商品按500g/份计价,如实收少于500g将退还差价
          </div>
          <div class="des">
            <i class="iconfont icon-tianping"></i>最快29分钟内送达
          </div>
        </div>
        <div class="good-specifications">
          <div class="guige">规格</div>
          <van-divider dashed />
          <div class="item">
            <span>保存条件</span>
            <span>冷藏</span>
          </div>
          <van-divider dashed />
          <div class="item">
            <span>保质期</span>
            <span>15天</span>
          </div>
          <van-divider dashed />
        </div>
        <div class="show">
          <img :src="goodDetails.small_image" />
          <img src="https://img.ddimg.mobi/3f280ff77ab3d1571213379189.jpg?width=750&height=1869" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodDetails: this.$route.params
    };
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
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
#gooddetail{
    background-color: #f5f5f5;
}
.top-header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  height: 0.5rem;
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
.details{
    background-color: #fff;
}
.good-img {
  padding-top: 0.5rem;
  padding-left: 0.1rem;
  width: 100%;
  text-align: center;
  /* height: 2rem; */
}
.good-img img {
  width: 90%;
}
.good-info {
  padding: 0.1rem;
  padding-left: 0.1rem;
}
.good-info .info-title {
  font-size: 0.15em;
  color: #000;
}
.good-info .info-spec {
  font-size: 0.13em;
  color: #808080;
  padding: 5px 0;
}
.info-price {
  position: relative;
  padding: 10px 0;
  font-size: 0;
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
.saled_num {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.1rem;
  margin: auto;
  height: 0.3rem;
  line-height: 0.3rem;
  color: rgb(226, 31, 31);
  text-align: center;
  font-size: 0.13rem;
  vertical-align: text-top;
}
.des {
  font-size: 0.14rem;
  color: #808080;
}
.des {
  padding: 10px 0;
}
.des i {
  font-size: 0.22rem;
  vertical-align: middle;
}
.good-specifications{
    margin-bottom: 0.1rem;
  padding-left: 0.1rem;
}
.guige {
  font-size: 0.18rem;
  padding: 5px 10px;
  color: #000;
}
.good-specifications .item {
  padding:0 10px;
  font-size: 0.13rem;
  color: #808080;
}
.good-specifications .item span {
  margin-right: 0.15rem;
}
.show{
    text-align: center;
}
.show img{
    width: 99%;
}
</style>