<template>
  <div id="vip">
      <div class="vip_box" @click="go()">
          <i class="iconfont icon-bianzu16"></i>
          <span>加入会员 每年预计节省806元</span>
          <span>五折开卡></span>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        go(){
            this.$router.push({name:'myvip'})
        }
    }
}
</script>

<style scoped>
.vip_box{
    background-color: #3bba63;
    width: 91%;
    color: #fff;
    font-size: 0.16rem;
    padding: 0.08rem 0.1rem;
    margin: 0 auto;
    border-radius: 0.05rem;
}
.vip_box span:last-child{
    float: right;
}
</style>