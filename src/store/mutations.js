import { mapState } from "vuex"

export default {
    curUserinfo(state, list) {
        state.userinfo = list
    },
    addCart(state, info) {
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
    },
    addshopnum(state,id){
        let shopcartlist = state.shopcartlist;
        shopcartlist[id]['num']++;
         // 给shopCart产生新对象
         state.shopcartlist = {
            ...shopcartlist
        }
    },
    subshopnum(state,id){
        let shopcartlist = state.shopcartlist;
        if(shopcartlist[id]['num'] > 0){
           shopcartlist[id]['num']--;
        }
        if(shopcartlist[id]['num'] == 0){
            delete shopcartlist[id];
        }
        state.shopcartlist = {
            ...shopcartlist
        }
    },
    changeChecked(state,id){
        let shopcartlist = state.shopcartlist;
        shopcartlist[id]['checked'] = shopcartlist[id]['checked']
        state.shopcartlist = {
            ...shopcartlist
        }
    }
}