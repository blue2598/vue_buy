<template>
  <div class="map">
    <div class="top-header">
      <span class="goback" @click="goback()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <p class="title">请选择地址</p>
    </div>
    <div class="map-wrapper">
      <baidu-map
        class="bm-view"
        @ready="handler"
        :ak="ak"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
      ></baidu-map>
    </div>
    <div class="position-text">
      <div class="now-position">
        <span>您当前的位置</span>
        <div class="position-item" @click="saveAddress(position)">
          <p>{{position}}</p>
          <p>{{address}}</p>
        </div>
      </div>
      <div class="near-position">
        <span>附近地址</span>
        <div
          class="position-item"
          v-for="(item,index) in surroundingPois"
          :key="index"
          @click="saveAddress(item.title)"
        >
          <p>{{item.title}}</p>
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
import { EventBus } from "../../../../js/bus";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmGeolocation from "vue-baidu-map/components/map/MapView";
export default {
  data() {
    return {
      ak: "5EFw9zIepcM3a8Z7UtxvFbKpzrFGXqxj",
      center: { lng: 0, lat: 0 },
      zoom: 15,
      position: "" || "蜀南庭苑",
      address: "" || "安徽省合肥市蜀山区",
      surroundingPois: [],
      chooseAddress: ""
    };
  },
  components: {
    BaiduMap,
    BmGeolocation
  },
  beforeDestroy() {
    //需要接收值的组件在created生命周期函数里写$on，需要往外传值的组件在destroyed生命周期函数函数里写：
    EventBus.$emit("local_address", this.chooseAddress);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    handler({ BMap, map }) {
      var that = this;
      //定位控制
      map.enableScrollWheelZoom(true);
      map.addControl(new BMap.GeolocationControl());
      //   获取当前坐标
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        console.log(r);
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          //   console.log("您的位置：" + r.point.lng + "," + r.point.lat);
          that.center.lng = r.point.lng;
          that.center.lat = r.point.lat;
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          that.zoom = 15;
          // 创建地理编码实例, 并配置参数获取乡镇级数据
          var myGeo = new BMap.Geocoder({ extensions_town: true });
          // 根据坐标得到地址描述
          myGeo.getLocation(new BMap.Point(r.point.lng,r.point.lat), function(
            result
          ) {
            if (result) {
              Dialog.confirm({
                message:"此处百度地图在国测局制定的GCJ-02首次加密基础上,进行了二次加密,需要坐标转换后使用。而此处并未进行转换,因此位置有偏移"
              })
              var res = result.addressComponents;
              that.position = res.streetNumber;
              that.address =
                res.province + res.city + res.district + res.street;
              that.surroundingPois = result.surroundingPois;
            }
          });
        } else {
          Toast("failed" + this.getStatus());
        }
      });
    },
    saveAddress(address) {
      this.chooseAddress = address;
      localStorage.setItem('address',address)
      this.$router.back();
    }
  }
};
</script>
<style scoped>
#gooddetail {
  background-color: #f5f5f5;
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
.map-wrapper {
  width: 100%;
  padding-top: 0.5rem;
  height: 30vh;
}
.bm-view {
  width: 100%;
  height: 100%;
}
.position-text {
  background-color: #f5f5f5;
  font-size: 0;
  padding-top: 0.1rem;
}
.now-position span,
.near-position span {
  font-size: 0.15rem;
  margin-left: 0.15rem;
}
.position-item {
  width: 100%;
  /* height: 0.5rem; */
  color: #f5f5f5;
  background-color: #fff;
  border-radius: 5px;
  border-bottom: 1px solid #ccc;
}
.position-item p:first-child {
  font-size: 0.16rem;
  color: #000;
  padding: 0.1rem 0 0 0.15rem;
}
.position-item p:nth-child(2) {
  font-size: 0.13rem;
  color: #ccc;
  padding: 0 0 0 0.15rem;
}
</style>