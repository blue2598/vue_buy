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
    //商品总个数
    getSelectAllNum(state) {
        let selectnum = 0;
        Object.values(state.shopcartlist).forEach((item, index) => {
            if (item.checked) {
                selectnum += item.num;
            }
        })
        return selectnum
    },
}