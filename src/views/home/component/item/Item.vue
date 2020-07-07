<template>
  <div id="item">
    <div class="item_wrapper">
      <div class="items" v-for="(item,index) in itemlist" :key="index" @click="goAllCategory(item.id)">
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
      active: 1,
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
    },
    goAllCategory(val){
      this.$router.push({name:'category',params:{'id':val}})
    }
  }
};
</script>

<style scoped>
#item{
  font-size: 0;
  width: 100vw;
}
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