<template>
  <div id="swiper">
    <van-swipe class="shop-swiper" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <img :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "../../../../axios/api";
export default {
  data() {
    return {
      images: []
    };
  },
  created() {
    this.getBanner();
  },
  components: {},
  methods: {
    async getBanner() {
      const response = await getBanner();
      if (response.message == "success") {
        this.images = response.data.bannerlist;
      }
    }
  }
};
</script>

<style scoped>
.shop-swiper {
  width: 98%;
  height: 1.7rem;
  margin: 0 auto;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transform: translateZ(0);
}
.shop-swiper img {
  width: 100%;
  height: 100%;
}
</style>