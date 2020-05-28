<template>
  <div>
    <van-tabbar class="tabbars" v-model="active" active-color="#75a342">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to='item.router'>
        <span>{{item.name}}</span>
        <template #icon="props">
          <img class="icon-item" :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabbars:[
        {
          router:'home',
          name:'首页',
          inactiveIcon:require('@/assets/images/tabbar/home0.png'),
          activeIcon:require('@/assets/images/tabbar/home1.png'),
        },
        {
          router:'category',
          name:'分类',
          inactiveIcon:require('@/assets/images/tabbar/category0.png'),
          activeIcon:require('@/assets/images/tabbar/category1.png')
        },
        {
          router:'eat',
          name:'推荐',
          inactiveIcon:require('@/assets/images/tabbar/eat0.png'),
          activeIcon:require('@/assets/images/tabbar/eat1.png')
        },
        {
          router:'shopcart',
          name:'购物车',
          inactiveIcon:require('@/assets/images/tabbar/shopcart0.png'),
          activeIcon:require('@/assets/images/tabbar/shopcart1.png')
        },{
          router:'personal',
          name:'我的',
          inactiveIcon:require('@/assets/images/tabbar/personal0.png'),
          activeIcon:require('@/assets/images/tabbar/personal1.png')
        }
      ]
    };
  },
  methods: {
    onChange(index) {}
  }
};
</script>

<style>
.icon-item{
  width: 25px;
  height: 25px !important;
}
</style>