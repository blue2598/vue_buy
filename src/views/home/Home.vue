<template>
  <div id="home">
    <div class="head">
      <Header></Header>
      <Swiper style="padding-top:0.6rem"></Swiper>
      <Tips></Tips>
    </div>
    <Homead></Homead>
    <Item></Item>
    <Vip></Vip>
    <Flashsale></Flashsale>
    <Special></Special>
    <Category></Category>
    <van-divider style="margin-bottom:50px">别翻啦，到底啦</van-divider>
  </div>
</template>

<script>
import Header from "./component/header/Header";
import Swiper from "./component/swiper/Swiper";
import Tips from "./component/tips/Tips";
import Homead from "./component/homead/Homead";
import Item from "./component/item/Item";
import Vip from "./component/vip/Vip";
import Flashsale from "./component/flashsale/Flashsale";
import Special from "./component/special/Special";
import Category from "./component/category/Category";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Swiper,
    Tips,
    Homead,
    Item,
    Vip,
    Flashsale,
    Special,
    Category
  },
  methods: {}
};
</script>

<style>
.head{
    background-image: url('http://518taole.7-orange.cn/backImage.png');
}
</style>