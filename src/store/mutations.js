import { mapState } from "vuex"
import router from '@/router/index.js'
import { Toast } from "vant";
export default {
    curUserinfo(state, list) {
        state.userinfo = list;
        localStorage.setItem('userinfo', JSON.stringify(list))
    },
    removeUserinfo(state) {
        state.userinfo = {};
        localStorage.removeItem('userinfo')
    },
    updateUsername(state, info) {
        state.userinfo.name = info;
        localStorage.setItem('userinfo', JSON.stringify(state.userinfo))
    },
    updateUsersex(state, info) {
        state.userinfo.sex = info;
        localStorage.setItem('userinfo', JSON.stringify(state.userinfo))
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
            Toast('加入购物车成功!')
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
    //清空购物车
    removeShopcart(state) {
        state.shopcartlist = {};
        localStorage.removeItem('shopcart')
        localStorage.removeItem('address')
        localStorage.removeItem('chooseaddress')
        localStorage.removeItem('deliveryaddress')
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
    //购物车全选切换
    checkAll(state, data) {
        Object.values(state.shopcartlist).forEach((item, index) => {
                item.checked = data;
        })
        state.shopcartlist = {
            ...state.shopcartlist
        }
        localStorage.setItem('shopcart', JSON.stringify(state.shopcartlist))
    },
    //保存选中的地址
    addDeliveryaddress(state, list) {
        let deliveryaddress = state.deliveryaddress;
        if (list.isDefault) {
            for (var i = 0; i < deliveryaddress.length; i++) {
                deliveryaddress[i].isDefault = false
            }
        }
        state.deliveryaddress = [
            ...state.deliveryaddress, list
        ]
        localStorage.setItem('deliveryaddress', JSON.stringify(state.deliveryaddress))
    },
    //编辑地址
    editDeliveryaddress(state, list) {
        let deliveryaddress = state.deliveryaddress;
        if (list.isDefault) {
            for (var i = 0; i < deliveryaddress.length; i++) {
                deliveryaddress[i].isDefault = false
            }
        }
        const index = state.deliveryaddress.findIndex(item => item.id === list.id)
        state.deliveryaddress.splice(index, 1, list)
        localStorage.setItem('deliveryaddress', JSON.stringify(state.deliveryaddress))
    },
    //删除地址
    deleteDeliveryaddress(state, id) {
        let deliveryaddress = state.deliveryaddress;
        const index = state.deliveryaddress.findIndex(item => item.id === id);
        //如果删除的是默认地址，将地址列表中第一个设为默认
        if (deliveryaddress[index].isDefault) {
            state.deliveryaddress['0'].isDefault = true
        }
        state.deliveryaddress.splice(index, 1);
        localStorage.setItem('deliveryaddress', JSON.stringify(state.deliveryaddress))
    },
    // 初始化收货地址
    init_deliveryaddress(state, arr) {
        if (arr) {
            state.deliveryaddress = arr;
        }
    },
}