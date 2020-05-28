<template>
  <div id="item">
    <div class="item_wrapper">
      <div class="items" v-for="(item,index) in itemlist" :key="index">
        <div>
          <img :src="item.icon_url" />
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItemList } from "../../../../axios/api";
export default {
  data() {
    return {
      itemlist: []
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    async getItemList() {
      const response = await getItemList();
      if (response.message == "success") {
        this.itemlist = response.data.navlist;
      }
    }
  }
};
</script>

<style>
.item_wrapper {
  background-color: #fff;
  font-size: 0.16rem;
  color: #999;
}
.item_wrapper div.items {
  display: inline-block;
  width: 20%;
  text-align: center;
  height: 0.8rem;
  padding: 8px 0;
}
.item_wrapper div.items img {
  width: 0.4rem;
  height: 0.4rem;
}
.item_wrapper div.items div {
  text-align: center;
}
</style>