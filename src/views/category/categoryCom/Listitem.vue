<template>
  <div id="listitem">
    <div class="type">
      <span
        class="item"
        v-for="(item,index) in goodlists"
        :key="index"
        :class="index==activedid ? actived : '' "
        @click="changeIndex(index)"
      >{{item.name}}</span>
    </div>
    <div class="goods">
      <div class="title">{{nowtitle}}</div>
      <div class="goodsitem">
        <ul v-for="(e,i) in goodlists" :key="i" v-show="i==showIndex">
          <li v-for="(item,index) in e.products" :key="index" @click="Details(item)">
            <div class="imgbox">
              <img :src="item.small_image" />
            </div>
            <div class="contentbox">
              <div class="name">{{item.product_name}}</div>
              <div class="desc">{{item.spec}}</div>
              <div class="price">
                <span class="now_price">{{item.price | priceFormat}}</span>
                <span class="old_price">{{item.origin_price | priceFormat}}</span>
                <span class="shopcart" @click.stop="addCart(item)">
                  <i class="iconfont icon-gouwuche" />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getListdetails, getRecommendTypeType } from "../../../axios/api";
import { mapAction, mapState, mapMutation } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      actived: "actived",
      nowtitle: "猜你喜欢",
      activedid: 0,
      typelists: [],
      goodlists: [],
      showIndex: 0
    };
  },
  watch: {
    listid: function(val) {
      this.getClickDetail(val);
    }
  },
  props: {
    listid: String
  },
  created() {
    this.getRecommend();
  },
  methods: {
    //初始化数据推荐
    async getRecommend() {
      const t1 = Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      let id = this.listid
      const res2 = await getListdetails(id);
      if (res2.message == "success") {
        t1.clear();
        this.goodlists = res2.data.cate;
        this.nowtitle = res2.data.cate[0].name;
      }
    },
    //得到左边父组件切换分类的id
    async getClickDetail(id) {
      this.goodlists = [];
      this.nowtitle = '';
      this.showIndex = 0;
      this.activedid = 0;
      const t1 = Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      const res2 = await getListdetails(id);
      if (res2.message == "success") {
        t1.clear();
        this.goodlists = res2.data.cate;
        this.nowtitle = res2.data.cate[0].name;
      }else{
        if(res2.code == '0002'){
          Toast('获取数据失败，请稍候重试')
        }
      }
    },
    //切换头部选项
    changeIndex(index) {
      this.activedid = index;
      this.showIndex = index;
      this.nowtitle = this.goodlists[index].name;
    },
    Details(item) {
      this.$router.push({
        name: "GoodDetails",
        params: {
          id: item.id,
          name: item.name,
          small_image: item.small_image,
          price: item.price,
          spec: item.spec,
          total_sales: item.total_sales,
          origin_price: item.origin_price
        }
      });
    },
    addCart(info) {
      this.$store.dispatch("addCart", info);
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
#listitem {
  font-size: 0;
}
.type {
  padding: 0.1rem 0;
  position: fixed;
  top: 0.5rem;
  width: 73%;
  background-color: #fff;
  z-index: 99;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.type::-webkit-scrollbar{
  display: none;
}
.item {
  font-size: 0.16rem;
  padding: 5px 9px;
  color: #666;
}
.type .item.actived {
  color: #46c527;
}
.goods {
  margin-top: 0.3rem;
  background-color: #f5f5f5;
}
.goods .title {
  font-size: 0.14rem;
  padding: 0.1rem;
  position: relative;
  color: #333;
}
.goods .title::before {
  content: "";
  width: 2px;
  height: 60%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: #46c527;
}

.goodsitem {
  background-color: #fff;
}
.goodsitem ul li {
  padding: 0.05rem 0.1rem;
  border-bottom: 1px solid #ccc;
}
.goodsitem .imgbox {
  width: 26%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.goodsitem .imgbox img {
  width: 100%;
}
.goodsitem .contentbox {
  width: 74%;
  display: inline-block;
  vertical-align: middle;
}
.goodsitem .contentbox .name {
  font-size: 0.16rem;
  padding: 5px 0 5px 5px;
}
.goodsitem .contentbox .desc {
  font-size: 0.15rem;
  color: #999;
  padding-left: 5px;
}
.price {
  padding: 5px 0 10px 5px;
  position: relative;
}
.now_price {
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