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

</style>
