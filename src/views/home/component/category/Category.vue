<template>
  <div id="category">
    <van-tabs v-model="active" color="#45c763" :swipeable="true" title-active-color="#45c763">
      <van-tab title="全部">
        <ProductItem :product_lists="all_lists"></ProductItem>
      </van-tab>
      <van-tab title="晚餐">
        <ProductItem :product_lists="dinner_lists"></ProductItem>
      </van-tab>
      <van-tab title="人气">
        <ProductItem :product_lists="hot_lists"></ProductItem>
      </van-tab>
      <van-tab title="心选">
        <ProductItem :product_lists="select_lists"></ProductItem>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";
import { getAll_lists,getDinner_lists,getHot_lists ,getSelect_lists} from "../../../../axios/api";
export default {
  props: {},
  data() {
    return {
      active: 1,
      all_lists: [],
      dinner_lists: [],
      hot_lists: [],
      select_lists: []
    };
  },
  created(){
      this.getProductlist()
  },
  methods: {
    async getProductlist() {
      const response1 = await getAll_lists();
      if (response1.message == "success") {
        this.all_lists = response1.data;
      }
      const response2 = await getDinner_lists();
      if (response2.message == "success") {
        this.dinner_lists = response2.data;
      }
      const response3 = await getHot_lists();
      if (response3.message == "success") {
        this.hot_lists = response3.data;
      }
      const response4 = await getSelect_lists();
      if (response4.message == "success") {
        this.select_lists = response4.data;
      }
    }
  },
  components: {
    ProductItem
  }
};
</script>

<style scoped>
</style>