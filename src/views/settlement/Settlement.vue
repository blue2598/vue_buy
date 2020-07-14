<template>
  <div id="order">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">订单结算</p>
    </div>
    <div class="details">
      <div class="addressChoose" @click="chooseAddress()">
        <van-contact-card add-text="选择收货地址" :type="type" :name="name" :tel="tel" :editable="false" />
      </div>
      <div class="timeChoose">
        <van-cell title="请选择送达时间" is-link @click="showtimeChoose = true" value="请选择送达时间" />
        <span class="tips" @click="showtimeChoose = true">超时十分钟可获得积分补偿</span>
        <van-action-sheet v-model="showtimeChoose" title="标题">
          <div class="content">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </div>
        </van-action-sheet>
      </div>
      <div class="goodslist">
        <ul class="cartlist">
          <li v-for="(item,index) in selectGoods" :key="index">
            <div class="imgbox">
              <img :src="item.small_image" />
            </div>
            <div class="contentbox">
              <div class="name">{{item.name}}</div>
              <div class="price">
                <span class="now_price">{{item.price | priceFormat}}</span>
                <div class="shopnum">
                  <span>x</span>
                  <span>{{item.num}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="payway">
        <span>支付方式</span>
        <van-radio-group v-model="result">
          <van-cell-group>
            <img src="../../assets/images/settlement/wechat.png" />
            <van-cell clickable key="0" title="微信支付" @click="payway(0)">
              <template #right-icon>
                <van-radio name="wechat" ref="radioes" />
              </template>
            </van-cell>
          </van-cell-group>
          <van-cell-group>
            <img src="../../assets/images/settlement/alipay.png" />
            <van-cell clickable key="1" title="支付宝支付" @click="payway(1)">
              <template #right-icon>
                <van-radio name="alipay" ref="radioes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="coupon">
        <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
            :show-exchange-bar="false"
          />
        </van-popup>
      </div>
      <div class="bz">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
          clearable
        />
      </div>
      <div class="money">
        <van-cell title="商品金额" :value="this.$store.getters.getTotalPrice | priceFormat2" />
        <van-cell title="配送费" value="0.00" />
      </div>
      <van-submit-bar
        :price="this.$store.getters.getTotalPrice"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Toast } from "vant";
var coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
export default {
  data() {
    return {
      chooseadd: false,
      showtimeChoose: false,
      currentDate: new Date(),
      minDate: new Date(),
      maxDate: new Date(2020, 10, 1),
      list: [
        { index: "0", name: "微信支付" },
        { index: "1", name: "支付宝支付" }
      ],
      result: "wechat",
      chosenCoupon: -1,
      coupons: [coupon],
      showList: false,
      disabledCoupons: [coupon],
      message: "",
      type: "add",
      name: null,
      tel: null
    };
  },
  computed: {
    ...mapState({
      shopcartlist: state => state.shopcartlist
    }),
    ...mapGetters({
      selectGoods: "getSelectGoods"
    })
  },
  created() {
    this.getDate();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getDate() {
      var list = JSON.parse(localStorage.getItem("chooseaddress"));
      if (list) {
        this.type = "edit";
        this.name = list.name;
        this.tel = list.tel;
      }
    },
    chooseAddress() {
      this.$router.push({ name: "deliveryaddress" });
    },
    payway(val) {
      return val;
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onSubmit() {
      Toast("提交");
    }
  },
  filters: {
    priceFormat(value) {
      return "￥" + value;
    },
    priceFormat2(value) {
      return "￥" + value / 100;
    }
  }
};
</script>

<style scoped>
#order {
  background-color: #f5f5f5;
  overflow-x: hidden;
  font-size: 0;
}
#order::-webkit-scrollbar {
  display: none;
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
}
.top-header p {
  font-size: 0.16rem;
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
  line-height: 0.5rem;
}
.goback {
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  color: teal;
  left: 0.2rem;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 0.2rem;
  font-size: 0.16rem;
}
.details {
  padding-top: 0.5rem;
  font-size: 0;
  background-color: #f5f5f5;
}
.timeChoose {
  background-color: #fff;
  margin-bottom: 0.1rem;
}
.tips {
  display: block;
  font-size: 0.12rem;
  color: #999;
  padding: 0 0 0.15rem 0.18rem;
  background-color: #fff;
}
.cartlist {
  background-color: #f5f5f5;
}
.cartlist li {
  padding: 0.05rem 0.1rem;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  margin-bottom: 0.1rem;
  background-color: #fff;
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
.van-cell-group img {
  position: absolute;
  left: 0.1rem;
  z-index: 999;
  width: 25px;
  height: 25px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.payway {
  margin-bottom: 0.1rem;
}
.payway .van-cell {
  padding: 10px 40px;
}
.coupon,
.bz {
  margin-bottom: 0.1rem;
}
/deep/ .van-radio__icon--checked .van-icon {
  background-color: #3bba63;
  border-color: #3bba63;
}
.money {
  margin-bottom: 50px;
}
</style>