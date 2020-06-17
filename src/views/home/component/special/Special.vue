<template>
  <div id="special">
    <div class="title_wrapper">
      <div>
        <span>特色专区</span>
      </div>
    </div>
    <div class="content_wrapper">
      <div class="shop-swiper">
        <div class="shop-item" v-for="(item,index) in shoplist" :key="index">
          <div class="product_title van-multi-ellipsis--l1">{{item.title}}</div>
          <div class="product_subtitle van-multi-ellipsis--l1">{{item.subtitle}}</div>
          <div class="product_img">
            <img :src="item.imageOne" />
            <img v-if="item.imageTwo" :src="item.imageTwo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSpecial } from "../../../../axios/api";
export default {
  data() {
    return {
      shoplist: []
    };
  },
  created() {
    this.getSpecial();
  },
  methods: {
    async getSpecial() {
      const response = await getSpecial();
      if (response.message == "success") {
        this.shoplist = response.data.falshsalelist;
      }
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
#special {
  font-size: 0.16rem;
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
.shop-swiper {
  width: 98%;
  margin: 0 auto;
  height: 2rem;
  overflow: hidden;
}
.shop-item {
  margin: 0 auto;
  width: 49%;
  float: left;
  padding:0.05rem 0;
  height: 48%;
  border: 0.01rem solid #dddbc0;

}
.shop-item:nth-child(1),
.shop-item:nth-child(3),
.shop-item:nth-child(4){
  border-right: none;
}

.shop-item:nth-child(4),.shop-item:nth-child(5){
  width: 24.4%;
}
.shop-item:nth-child(4) img,.shop-item:nth-child(5) img {
  width: 90%;
}
.product_title {
  padding: 2px 10px;
  font-size: 0.13rem;
  background-image: linear-gradient(135deg, red, orange);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}
.product_subtitle {
  padding: 3px 10px;
  font-size: 0.12rem;
  color: rgb(155, 155, 155);
}
.product_img {
  height: 0.6rem;
}
.product_img img {
  width: 30%;
  padding: 0 0.1rem;
  /* height: 0.5rem; */
}
</style>