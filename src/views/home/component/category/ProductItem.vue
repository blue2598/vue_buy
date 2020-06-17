<template>
  <div id="productList">
    <div class="list" v-for="(item,index) in product_lists" :key='index' @click="Details(item)">
        <div class="imgbox">
            <img :src="item.small_image">
        </div>
        <div class="text">
            <div class="title van-ellipsis">{{item.product_name}}</div>
            <div class="subtitle van-ellipsis">{{item.spec}}</div>
        </div>
        <div class="price">
            <span class="now_price">{{item.price | priceFormat}}</span>
            <span class="old_price">{{item.origin_price | priceFormat}}</span>
            <span class="shopcart">
              <i class="iconfont icon-gouwuche" />
            </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        product_lists:Array,
    },
    data(){
        return{
            active:1
        }
    },
    methods:{
        Details(item){
            this.$router.push({
                name:'GoodDetails',
                params:{
                    id:item.id,
                    name:item.name,
                    small_image:item.small_image,
                    price:item.price,
                    spec:item.spec,
                    total_sales:item.total_sales,
                    origin_price:item.origin_price,
                    }
                })
        }
    },
     filters:{
      priceFormat(value){
          return '￥'+value
      }
  }
};
</script>

<style scoped>
#productList{
    padding: 10px 0 0 10px;
    background-color: #f5f5f5;
}
.list{
    width: 48%;
    margin-right: 2%;
    background-color: #fff;
    font-size: 0.16rem;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 10px;
}
.list .imgbox{
    width: 100%;
    height: 70%;
    text-align: center;
}
.list .imgbox img{
    width: 90%;
}
.text .title{
    font-size: 0.13rem;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #000;
    padding: 0 5px;
}
.text .subtitle{
    padding: 5px;
    font-size: 0.12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #808080;
}
.price{
    padding: 5px 0 10px 5px;
    position: relative;
}
.now_price{
    color: rgb(226, 31, 31);
    font-size: 0.18rem;
}
.old_price{
    color: #999;
    font-size: 0.14rem;
    text-decoration: line-through;
}
.shopcart{
    position: absolute;
    top:0;
    bottom: 0;
    right: 0.1rem;
    margin: auto;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 0.3rem;
    background-color: #45c763;
    color: #fff;
    text-align: center;
    border-radius: 50%;
}
.shopcart i{
    font-size: 0.18rem;
}
</style>