<template>
  <div id="app">
    <BackToTop></BackToTop>
    <router-view/>
  </div>
</template>

<script>
import BackToTop from './components/BackToTop'
import{mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    BackToTop,
  },
  computed:{
    ...mapState({
      userinfo:state=>state.userinfo
    }),
  },
  created(){
    this.init_userinfo();
    this.init_shopcart();
    this.init_deliveryaddress();
  },
  methods:{
    init_userinfo(){
      var userinfoLocal = localStorage.getItem('userinfo');
      if(userinfoLocal){
        this.$store.dispatch('curUserinfo',JSON.parse(userinfoLocal))
      }
    },
    init_shopcart(){
      var shopcartLocal = localStorage.getItem('shopcart');
      if(shopcartLocal){
        this.$store.dispatch('init_shopcart',JSON.parse(shopcartLocal))
      }
    },
    init_deliveryaddress(){
      var deliveryaddress = localStorage.getItem('deliveryaddress');
      if(deliveryaddress){
        this.$store.dispatch('init_deliveryaddress',JSON.parse(deliveryaddress))
      }
    }
  },
}
</script>

<style>
body{
  /* overflow-y: scroll; */
  /* overflow: hidden; */
  /* overflow-x: hidden; */
}
body::-webkit-scrollbar{
  display: none;
}
</style>
