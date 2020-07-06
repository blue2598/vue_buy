<template>
  <div class="backTop" @click="scrollFn()" v-show="showThis">
    <i class="iconfont icon-fanhuidingbu"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollTop: 0,
      showThis: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.getScrollTop);
  },
  methods: {
    scrollFn() {
         document.documentElement.scrollTop = 0;
    },
    getScrollTop() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(this.scrollTop)
      this.scrollTop > 300 ? (this.showThis = true) : (this.showThis = false);
    }
  }
};
</script>
<style scoped>
.backTop {
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0;
  position: fixed;
  bottom: 0.8rem;
  right: 0rem;
  text-align: center;
  line-height: 0.5rem;
  z-index: 999;
  color: transparent;
  background-image: linear-gradient(green, blue);
  background-clip: text;
  -webkit-background-clip: text;
  animation: hue 30s infinite linear;
  /* display: none; */
  /* animation: toTop 2s infinite linear; */
  /* -webkit-animation: toTop .5s infinite linear; */
}
@keyframes hue {
  from {
    filter: hue-rotate(0);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
@keyframes toTop {
  from {
    bottom: 0.8rem;
  }
  to {
    top: 0.8rem;
  }
}
.backTop i {
  font-size: 50px;
}
@-webkit-keyframes toTop {
  0% {
    bottom: 0.8rem;
  }
  100% {
    bottom: 3rem;
  }
}
.backTop i {
  font-size: 50px;
}
</style>