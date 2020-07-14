export default {
    //购物车总价格
    getTotalPrice(state) {
        let totalPrice = 0;
        Object.values(state.shopcartlist).forEach((item, index) => {
            if (item.checked) {
                totalPrice += item.num * item.price * 100//vant 组件需要的格式35.80元即格式为3580
            }
        })
        return totalPrice
    },
    //选中的商品
    getSelectGoods(state) {
        let shopcartlist = state.shopcartlist;
        let goods = []
        Object.values(shopcartlist).forEach((item, index) => {
            if(item.checked){
                goods.push(item)
            }
        })
        return goods
    },
    //选中商品的种类个数,购物车结算后的数字
    getSelectNum(state) {
        let count = 0;
        let shopcartlist = state.shopcartlist;
        Object.values(shopcartlist).forEach((item, index) => {
            if (item.checked) {
                count++;
            }
        });
        return count;
    },
    //商品总个数 购物车上badge
    getCartAllNum(state) {
        let cartnum = 0;
        Object.values(state.shopcartlist).forEach((item, index) => {
            cartnum += item.num;
        })
        return cartnum
    },
}