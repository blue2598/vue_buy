<template>
  <div class="menulist">
    <div class="label">
      <ul>
        <li
          v-for="(item,index) in typelist"
          :key="index"
          :class="item.id==curIndex?actived:''"
          @click="changeThis(item.id)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in recommendlist" :key="index">
          <div class="pic">
            <img :src="item.image" />
          </div>
          <div class="name">
            <span>{{item.name}}</span>
          </div>
          <div class="author">
            <span class="avator">
              <img :src="item.author_avatar" />
            </span>
            <span class="auname">{{item.author_name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <van-divider style="margin-bottom:50px">别翻啦，到底啦</van-divider>
  </div>
</template>

<script>
import { getRconmmendType } from "../../../axios/api";
import { getRconmmendDefault } from "../../../axios/api";
export default {
  data() {
    return {
      typelist: [],
      curIndex: "0",
      actived: "actived",
      recommendlist: []
    };
  },
  created() {
    this.getRconmmendType();
  },
  methods: {
    async getRconmmendType() {
      const response = await getRconmmendType();
      if (response.message == "success") {
        this.typelist = response.data.list;
        this.curIndex = response.data.list[0].id;
        this.getRconmmendDefault(response.data.list[0].id);
      }
    },
    changeThis(id) {
      this.curIndex = id;
    },
    async getRconmmendDefault(idVal) {
      const response = await getRconmmendDefault(idVal);
      if (response.message == "success") {
        this.recommendlist = response.data.recommend_list;
      }
    }
  }
};
</script>

<style>
.list_wrapper .label {
  width: 100%;
  height: 0.5rem;
  overflow: hidden;
  overflow-x: scroll;
}
.list_wrapper .label ul {
  height: 100%;
  width: 20rem;
}
.list_wrapper .label ul li {
  padding: 0.1rem;
  display: inline-block;
}
.list_wrapper .label ul li span {
  font-size: 0.16rem;
  display: block;
  padding: 6px 9px;
  border: 1px solid #f5f5f5;
  color: #111;
  background-color: #fff;
  transition: all .5s;
}
.list_wrapper .label ul li.actived span {
  background-color: #45c763;
  color: #fff;
}
.list ul{
  /* margin-bottom: 0.5rem; */
}
.list ul li {
  display: inline-block;
  width: 42%;
  padding: 0.2rem 2%;
  margin: 0.1rem 2%;
  vertical-align: top;
  background-color: #fff;
  border-radius: 5px;
}
.list ul li .pic img {
  width: 100%;
  border-radius: 10px;
}
.list ul li .name {
  font-size: 0.25rem;
  font-weight: 700;
  padding: 0.1rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.list ul li .author .avator {
  width: 30%;
  display: inline-block;
  vertical-align: middle;
}
.list ul li .author .avator img {
  width: 100%;
  border-radius: 50%;
}
.list ul li .author .auname {
  font-size: 0.16rem;
  width: 68%;
  margin-left: 2%;
  color: #999;
  vertical-align: middle;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>