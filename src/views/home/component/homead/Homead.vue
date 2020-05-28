<template>
  <div id="adver">
    <img :src="adImg" />
  </div>
</template>

<script>
import {getAdvertise} from '../../../../axios/api'
export default {
  data() {
    return {
      adImg: ""
    };
  },
  created(){
      this.getAdimg()
  },
  methods: {
    async getAdimg() {
      const response = await getAdvertise();
      if (response.message == "success") this.adImg = response.data.adImg;
    }
  }
};
</script>

<style>
#adver {
    width: 100%;
    height: 1.2rem;
}
#adver img{
    width: 100%;
    height: 100%;
}
</style>