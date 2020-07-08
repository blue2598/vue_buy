export default{
    curUserinfo(context,list){
        context.commit('curUserinfo',list)
    },
    addCart(context,info){
        context.commit('addCart',info)
    },
    addshopnum(context,id){
        context.commit('addshopnum',id)
    },
    subshopnum(context,id){
        context.commit('subshopnum',id)
    },
    changeChecked(context,id){
        context.commit('changeChecked',id)
    }
}