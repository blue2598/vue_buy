<template>
  <div id="shop">
    <div class="top-header">
      <p class="title">购物车</p>
      <span class="clearall" @click="clearAll()" v-show="!isEmpty">清空</span>
    </div>
    <!-- 购物车不为空 -->
    <div class="cartlist" v-show="!isEmpty">
      <ul>
        <li v-for="(item,index) in shopcartlist" :key="index" ref="checkboxes">
          <van-checkbox :name="item.name" v-model="item.checked" @click="changeStatus(item.id)">
            <div class="imgbox">
              <img :src="item.small_image" />
            </div>
            <div class="contentbox">
              <div class="name">{{item.name}}</div>
              <div class="price">
                <span class="now_price">{{item.price | priceFormat}}</span>
                <div class="shopnum">
                  <span @click.stop="sub_num(item.id,item.num)">-</span>
                  <span>{{item.num}}</span>
                  <span @click.stop="add_num(item.id)">+</span>
                </div>
              </div>
            </div>
          </van-checkbox>
        </li>
      </ul>
    </div>
    <!-- 购物车为空 -->
    <van-empty description="购物车是空的" :image="emptyImage" v-show="isEmpty">
      <van-button round type="danger" class="bottom-button" @click="goIndex()">去逛逛</van-button>
    </van-empty>
    <!-- 提交订单 -->
    <van-submit-bar
      :price="this.$store.getters.getTotalPrice"
      :button-text="'结算('+this.$store.getters.getSelectNum+')'"
      @submit="onSubmit"
      v-show="!isEmpty"
    >
      <van-checkbox v-model="checkStatus">全选</van-checkbox>
    </van-submit-bar>
    <van-divider :style="{ color: '#000', borderColor: '#999',fontSize:'0.18rem'}">猜你喜欢</van-divider>
    <div class="guess">
      <div class="list" v-for="(item,index) in product_lists" :key="index" @click="Details(item)">
        <div class="imgbox">
          <img :src="item.small_image" />
        </div>
        <div class="text">
          <div class="title van-ellipsis">{{item.product_name}}</div>
          <div class="subtitle van-ellipsis">{{item.spec}}</div>
        </div>
        <div class="price">
          <span class="now_price">{{item.price | priceFormat}}</span>
          <span class="old_price">{{item.origin_price | priceFormat}}</span>
          <span class="shopcart" @click.stop="addCart(item)">
            <i class="iconfont icon-gouwuche" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { getAll_lists } from "../../axios/api";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      emptyImage: require("@/assets/images/shopcart/empty.png"),
      product_lists: [],
      checked: true,
      priceAll: 0
    };
  },
  computed: {
    ...mapState({
      shopcartlist: state => state.shopcartlist
    }),
    isEmpty() {
      return this.totalCount() > 0 ? false : true;
    },
    checkStatus: {
      get() {
        let status = this.totalCount() > 0;
        Object.values(this.shopcartlist).forEach(item => {
          if (!item.checked) {
            status = false;
          }
        });
        return status;
      },
      set(value) {
        this.$store.dispatch("checkAll", value);
      }
    }
  },
  created() {
    this.getProductlist();
  },
  methods: {
    test() {
      // console.log(this.shopcartlist)
    },
    async getProductlist() {
      const response1 = await getAll_lists();
      if (response1.message == "success") {
        this.product_lists = response1.data;
      }
    },
    goIndex() {
      this.$router.push({ name: "home" });
    },
    sub_num(id, num) {
      if (num === 1) {
        Dialog.confirm({
          message: "确认删除商品？"
        })
          .then(() => {
            this.$store.dispatch("subshopnum", id);
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$store.dispatch("subshopnum", id);
      }
    },
    add_num(id) {
      this.$store.dispatch("addshopnum", id);
    },
    totalCount() {
      return Object.keys(this.shopcartlist).length;
    },
    // 选中状态
    changeStatus(id) {
      this.$store.dispatch("changeChecked", id);
    },
    checkAll() {
      // this.$refs.checkboxes.toggleAll(true);
    },
    addCart(info) {
      this.$store.dispatch("addCart", info);
    },
    onSubmit() {
      if (this.$store.getters.getSelectNum > 0) {
        this.$router.push({ name: "settlement" });
      }else{
        Toast('没选择商品噢')
      }
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
    clearAll() {
      Dialog.confirm({
        title: "温馨提示",
        message: "确认清空购物车？"
      }).then(() => {
        this.$store.dispatch("removeShopcart");
      });
    }
  },
  filters: {
    priceFormat(value) {
      return "￥" + value;
    },
    priceFormat2(v) {
      return v * 100;
    }
  }
};
</script>

<style scoped>
#shop {
  background-color: #f5f5f5;
  font-size: 0;
}
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #fff;
  height: 0.5rem;
  line-height: 0.5rem;
  z-index: 10;
  margin-bottom: 0.1rem;
}
.top-header p {
  font-size: 0.16rem;
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
  line-height: 0.5rem;
}
.clearall {
  font-size: 0.14rem;
  color: #45c763;
  position: absolute;
  right: 0.2rem;
  top: 0;
  bottom: 0;
  margin: auto;
}
/deep/ .van-empty__image {
  width: 276px;
}
/deep/ .van-empty {
  padding-top: 0.7rem;
}
/deep/ .van-empty__bottom {
  margin-top: 0;
}
.bottom-button {
  width: 160px;
  height: 40px;
  background-color: #45c763;
  border: none;
  font-size: 0.18rem;
}
.guess {
  padding-left: 2%;
  margin-bottom: 0.5rem;
}
.list {
  width: 48%;
  margin-right: 2%;
  background-color: #fff;
  font-size: 0.16rem;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 10px;
}
.list .imgbox {
  width: 100%;
  height: 70%;
  text-align: center;
}
.list .imgbox img {
  width: 90%;
}
.text .title {
  font-size: 0.13rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000;
  padding: 0 5px;
}
.text .subtitle {
  padding: 5px;
  font-size: 0.12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #808080;
}
.price {
  padding: 5px 0 10px 5px;
  position: relative;
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
.cartlist {
  margin-top: 0.5rem;
  background-color: #f5f5f5;
  padding: 0.1rem 0;
}
.cartlist ul li {
  padding: 0.05rem 0.1rem;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  margin-bottom: 0.1rem;
}
.cartlist .imgbox {
  width: 26%;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.cartlist .imgbox img {
  width: 100%;
}
.cartlist .contentbox {
  width: 74%;
  display: inline-block;
}
.cartlist .contentbox .name {
  font-size: 0.16rem;
  padding: 8px 0 10px 5px;
}
.cartlist .contentbox .desc {
  font-size: 0.15rem;
  color: #999;
  padding-left: 5px;
}
.cartlist .price {
  padding: 10px 0 10px 5px;
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
.shopnum {
  position: absolute;
  right: 0.15rem;
  font-size: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 0.25rem;
}
.shopnum span:nth-child(1),
.shopnum span:nth-child(3) {
  font-size: 0.2rem;
  color: #111;
  vertical-align: middle;
  display: inline-block;
}
.shopnum span:nth-child(2) {
  font-size: 0.2rem;
  vertical-align: middle;
  display: inline-block;
  background: #f5f5f5;
  padding: 0.05rem 0.1rem;
  margin: 0 5px;
  color: #333;
  font-weight: 100;
}
/deep/ .van-stepper--round .van-stepper__minus {
  color: #45c763;
  border-width: 2px;
  border-color: #45c763;
  font-weight: 700;
}
/deep/ .van-stepper--round .van-stepper__plus {
  background-color: #45c763;
}
/deep/ .van-submit-bar {
  bottom: 0.5rem;
}
</style>