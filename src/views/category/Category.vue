<template>
  <div id="category">
    <div class="search">
      <div class="search_box">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="输入商品名称" />
      </div>
    </div>
    <div class="content">
      <div class="left-wrapper">
        <ul>
          <li
            v-for="(item,index) in cateLists"
            :key="index"
            :class="item.id==listid?actived:''"
            @click="showAll(item.id,index)"
            ref="menulist"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="right-wrapper">
        <Listitem :listid="listid"></Listitem>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getCatelists } from "../../axios/api";
import Listitem from "./categoryCom/Listitem";
export default {
  data() {
    return {
      active: "",
      actived: "actived",
      cateLists: [],
      listid: this.$route.params.id ? this.$route.params.id : "recommend",
      scroll: null
    };
  },
  components: {
    Listitem
  },
  mounted() {
    this.getCate();
  },
  methods: {
    async getCate() {
      const response = await getCatelists();
      if (response.message == "success") {
        this.cateLists = response.data.cate;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(".left-wrapper", {
              probeType: 3,
              click: true,
              scrollY: true,
              tap: true,
              mouseWheel: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    showAll(id, index) {
      this.listid = id;
      setTimeout(() => {
        let menulist = this.$refs.menulist;
        let el = menulist[index];
        // 2.3 滚动到对应元素上
        this.scroll.scrollToElement(el, 300);
      }, 900);
    }
  }
};
</script>

<style scoped>
#category {
  width: 100vw;
  height: 100vh;
}
#category::-webkit-scrollbar{
  display: none;
}
.search {
  background-color: #fff;
  width: 100%;
  padding: 0.1rem 0;
}
.search_box {
  width: 95%;
  background-color: #f5f5f5;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.2rem;
  position: relative;
  border-radius: 0.2rem;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}
.search_box i {
  position: absolute;
  left: 0.2rem;
}
.search_box input {
  border: none;
  outline: none;
  width: 90%;
  height: 100%;
  text-align: center;
  font-size: 0.16rem;
  background-color: transparent;
}
.content {
  height: calc(100% - 0.6rem - 0.5rem);
}
.left-wrapper {
  width: 27%;
  height: 100%;
  float: left;
  background-color: #f5f5f5;
  overflow: hidden;
  overflow-y: scroll;
}
.left-wrapper ul {
}
.left-wrapper ul::-webkit-scrollbar {
  display: none;
}
.left-wrapper ul li {
  font-size: 0.16rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.15rem;
}
.left-wrapper ul li.actived {
  background-color: #fff;
  position: relative;
}
.left-wrapper ul li.actived span {
  font-weight: 700;
  color: #333;
}
.left-wrapper ul li.actived:before {
  position: absolute;
  content: "";
  width: 3px;
  height: 50%;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #3cb963;
}
.left-wrapper ul li + li {
  border-top: 1px solid rgb(216, 216, 216);
}
.left-wrapper ul li span {
  color: #666;
}
.right-wrapper {
  width: 73%;
  height: 100%;
  float: left;
  overflow: hidden;
  overflow-y: scroll;
}
</style>