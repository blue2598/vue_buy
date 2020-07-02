<template>
  <div id="header" :class='this.scrollTop>100?"bg1":""'>
      <div class="position_wrapper">
          <div class="position_box" @click="GoMap()">
              <i class="iconfont icon-dingwei"></i>
              <span>请选择位置</span>
              <i class="iconfont icon-jiantouxia"></i>
          </div>
      </div>
      <div class="search_wrapper">
          <div class="search_box">
              <i class="iconfont icon-sousuo"></i>
              <input type="text" placeholder="输入商品名称" />
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            scrollTop:0,
        }
    },
    mounted(){
        window.addEventListener('scroll', this.getScrollTop);
    },
    methods:{
        GoMap(){
            this.$router.push({name:"map"})
        },
         getScrollTop(){
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        }
    }
}
</script>

<style>
#header{
    font-size: 0.14rem;
    padding: 0.1rem 0;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 99;
}
.bg1{
    background-color: #fff;
}
.bg1 .search_wrapper .search_box{
    background-color: #f5f5f5;
}
.position_wrapper{
    width: 35%;
    display: inline-block;
}
.position_box{
    margin:0 auto;
    color: #fcfcfc;
    background-color: rgba(0,0,0,0.6);
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.16rem;
    width: 98%;
    border-radius: 0.2rem;
}
.search_wrapper{
    width: 63%;
    display: inline-block;
}
.search_box{
    width: 98%;
    background-color: #fff;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 0.2rem;
    position: relative;
    border-radius: 0.2rem;
    text-align: center;
}
.search_box  i{
    position: absolute;
    left:0.2rem;
}
.search_box input{
    border:none;
    outline: none;
    width: 60%;
    height: 100%;
    text-align:center ;
    font-size: 0.16rem;
    background-color: transparent;
}
</style>