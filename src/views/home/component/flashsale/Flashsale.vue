<template>
  <div id="flashsale">
    <div class="title_wrapper">
      <div>
        <span>限时抢购</span>
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="time">{{ timeData.hours|timeFormat}}</span>
            <span class="colon">:</span>
            <span class="time">{{ timeData.minutes|timeFormat }}</span>
            <span class="colon">:</span>
            <span class="time">{{ timeData.seconds|timeFormat }}</span>
          </template>
        </van-count-down>
        <span class="more">更多</span>
      </div>
    </div>
    <div class="content_wrapper">
      <div class="shop-swiper">
        <div class="shop-item" v-for="(item,index) in shoplist" :key="index">
          <div class="product_img">
            <img :src="item.small_image" />
          </div>
          <div class="product_name van-multi-ellipsis--l2">{{item.product_name}}</div>
          <div class="product_price">
            <span class="now_price">{{item.price | priceFormat}}</span>
            <span class="old_price">{{item.origin_price | priceFormat}}</span>
            <span class="shopcart">
              <i class="iconfont icon-gouwuche" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFlashsale } from "../../../../axios/api";
export default {
  data() {
    return {
      shoplist: [],
      time: 2 * 60 * 60 * 1000,
      timeH: 2,
      timeM: 0,
      timeS: 0
    };
  },
  created() {
    this.getFlashsale();
  },
  watched: {},
  methods: {
    async getFlashsale() {
      const response = await getFlashsale();
      if (response.message == "success") {
        this.shoplist = response.data.falshsalelist;
      }
    }
  },
  filters: {
    priceFormat(value) {
      return "￥" + value;
    },
    timeFormat(value) {
      if (value < 9) return "0" + value;
      else return value;
    }
  }
};
</script>

<style scoped>
#flashsale {
  font-size: 0.16rem;
  padding: 10px 0;
}
.title_wrapper {
  padding: 10px 0 10px 15px;
  font-size: 0.18rem;
  color: #000;
  font-weight: 700;
  position: relative;
}
.title_wrapper::before {
  content: "";
  position: absolute;
  width: 3px;
  height: 20px;
  background-color: #45c763;
  top: 0;
  bottom: 0;
  left: 0.05rem;
  margin: auto;
}
.time {
  display: inline-block;
  background-color: #000;
  color: #fff;
  width: 0.25rem;
  text-align: center;
}
.van-count-down{
  display: inline-block;
}
.more {
  float: right;
  color: #45c763;
  font-size: 0.16rem;
  font-weight: 500;
}
.content_wrapper {
  width: 100vw;
  overflow: hidden;
  overflow-x: scroll;
}
.content_wrapper::-webkit-scrollbar {
  display: none;
}
.shop-swiper {
  width: 250vw;
  height: 2rem;
  margin: 0 auto;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.shop-item {
  display: inline-block;
  width: 1rem;
  padding: 10px;
  vertical-align: top;
}
.product_img img {
  width: 1rem;
  height: 1rem;
}
.product_name {
  color: #666;
  font-size: 0.14rem;
}
.product_price {
  padding: 10px 0;
  position: relative;
}
.now_price {
  display: block;
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
  background-color: #45c763;
  color: #fff;
  text-align: center;
  border-radius: 50%;
}
.shopcart i {
  font-size: 0.18rem;
}
</style>