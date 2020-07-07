<template>
  <div id="app">
    <BackToTop></BackToTop>
    <router-view/>
  </div>
</template>

<script>
import BackToTop from './components/BackToTop'
export default {
  name: 'App',
  components:{
    BackToTop,
  }
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
