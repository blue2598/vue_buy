<template>
  <div id="recommend">
    <div class="search_wrapper">
      <div class="search_box">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索菜谱、食材" />
      </div>
      <div class="fav_box">
        <i class="iconfont icon-shoucangjia"></i>
      </div>
    </div>
    <div class="list_wrapper">
      <Menulist></Menulist>
    </div>
  </div>
</template>

<script>
import Menulist from './components/Menulist';
export default {
  data() {
    return {
    };
  },
  components:{
    Menulist
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped>
#recommend {
  font-size: 0;
}
.search_wrapper {
  width: 100%;
  padding: 0.12rem 0;
  position: fixed;
  top: 0;
  background-color: #fff;
}
.search_box {
  width: 80%;
  background-color: #f5f5f5;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.2rem;
  position: relative;
  border-radius: 0.2rem;
  text-align: center;
  margin-left: 10px;
  display: inline-block;
}
.search_box i {
  position: absolute;
  left: 0.2rem;
}
.search_box input {
  border: none;
  outline: none;
  width: 70%;
  height: 100%;
  text-align: left;
  font-size: 0.16rem;
  background-color: transparent;
}
.fav_box {
  display: inline-block;
  width: 12%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: right;
  vertical-align: top;
}
.fav_box i {
  font-size: 0.3rem;
  color: #45c763;
  font-weight: 700;
}
.list_wrapper {
  padding-top: 0.64rem;
  background-color: #f5f5f5;
}
</style>