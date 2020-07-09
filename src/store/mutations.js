import { mapState } from "vuex"
import router from '@/router/index.js'
export default {
    curUserinfo(state, list) {
        state.userinfo = list;
        localStorage.setItem('userinfo', JSON.stringify(list))
    },
    removeUserinfo(state) {
        state.userinfo = {};
    },
    //添加商品到购物车
    addCart(state, info) {
        if (JSON.stringify(state.userinfo) != '{}') {
            let shopcartlist = state.shopcartlist;
            if (shopcartlist[info.id]) {
                shopcartlist[info.id]['num']++
            } else {
                shopcartlist[info.id] = {
                    'num': 1,
                    'id': info.id,
                    'name': info.name,
                    'price': info.price,
                    'small_image': info.small_image,
                    'checked': true
                }
            }
            // 给shopCart产生新对象
            state.shopcartlist = {
                ...shopcartlist
            }
            localStorage.setItem('shopcart', JSON.stringify(state.shopcartlist))
        } else {
            router.push('/login')
        }
    },
    //初始化购物车，从localstorage中获取
    init_shopcart(state, list) {
        var shopcartLocal = localStorage.getItem('shopcart');
        if (shopcartLocal) {
            state.shopcartlist = list
        }
    },
    //退出清空购物车
    removeShopcart(state) {
        state.shopcartlist = {};
    },
    //购物车增加商品
    addshopnum(state, id) {
        let shopcartlist = state.shopcartlist;
        shopcartlist[id]['num']++;
        // 给shopCart产生新对象
        state.shopcartlist = {
            ...shopcartlist
        }
        localStorage.setItem('shopcart', JSON.stringify(state.shopcartlist))
    },
    //购物车减少商品
    subshopnum(state, id) {
        let shopcartlist = state.shopcartlist;
        if (shopcartlist[id]['num'] > 0) {
            shopcartlist[id]['num']--;
        }
        if (shopcartlist[id]['num'] == 0) {
            delete shopcartlist[id];
        }
        state.shopcartlist = {
            ...shopcartlist
        }
        localStorage.setItem('shopcart', JSON.stringify(state.shopcartlist))
    },
    //改变商品选中状态
    changeChecked(state, id) {
        let shopcartlist = state.shopcartlist;
        shopcartlist[id]['checked'] = shopcartlist[id]['checked']
        state.shopcartlist = {
            ...shopcartlist
        }
        localStorage.setItem('shopcart', JSON.stringify(state.shopcartlist))
    },
    //保存选中的地址
}