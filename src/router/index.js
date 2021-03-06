import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/index/Index.vue'

import Home from '../views/home/Home.vue'
import Map from '../views/home/component/map/Map'
import Category from '../views/category/Category'
//我的
import Personal from '../views/personal/Personal'
import Userinfo from '../views/personal/components/Userinfo.vue'
import Coupon from '../views/personal/components/Coupon.vue'
import Myvip from '../views/personal/components/Myvip.vue'
import Order from '../views/personal/components/Order.vue'

import Shopcart from '../views/shopcart/Shopcart.vue'
import Eat from '../views/recommend/Eat'
//订单结算
import Settlement from '../views/settlement/settlement.vue'

import Deliveryaddress from '../views/address/Deliveryaddress'
import Addaddress from '../views/address/children/Addaddress.vue'
import Editaddress from '../views/address/children/Editaddress.vue'

import GoodDetails from '../components/GoodDetails.vue'
import Login from '../components/Login.vue'

import store from '../store/index'
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err => err);
}
const router = new Router({
    //路由跳转页面不置顶问题
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: [{
        path: '/',
        redirect: '/index',
        meta: {
            keepAlive: true
        },
    }, {
        // 根页面 
        path: '/index',
        name: 'index',
        component: Index,
        children: [{
            path: '/index',
            redirect: '/index/home',
        }, {
            // 主页
            path: 'home',
            name: 'home',
            component: Home
        }, {
            // 分类
            path: 'category',
            name: 'category',
            component: Category,
        }, {
            // 吃什么
            path: 'eat',
            name: 'eat',
            component: Eat
        }, {
            // 购物车
            path: 'shopcart',
            name: 'shopcart',
            component: Shopcart,
        }, {
            // 我的
            path: 'personal',
            name: 'personal',
            component: Personal,
            children:[{
                path:'userinfo',
                name:'userinfo',
                component:Userinfo,
                meta:{
                    needLogin:true
                }
            },
            {
                path:'coupon',
                name:'coupon',
                component:Coupon,
                meta:{
                    needLogin:true
                }
            },{
                path:'myvip',
                name:'myvip',
                component:Myvip,
                meta:{
                    needLogin:true
                }
            },{
                path:'order',
                name:'order',
                component:Order,
                meta:{
                    needLogin:true
                }
            }]
           
        },{
            path:'map',
            name:'map',
            component: Map,
        }]
    },{
        //订单结算
        path:'/settlement',
        name:'settlement',
        component:Settlement,
    },{
        path:'/deliveryaddress',
        name:'deliveryaddress',
        component:Deliveryaddress,
        meta:{
            needLogin:true
        },
        children:[{
            path:'addaddress',
            name:'addaddress',
            component:Addaddress,
            meta:{
                needLogin:true
            }
        },{
            path:'editaddress',
            name:'editaddress',
            component:Editaddress,
            meta:{
                needLogin:true
            }
        }]
    },{
        path:'/goodDetails',
        name:'GoodDetails',
        component:GoodDetails
    },{
        path:'/Login',
        name:'login',
        component:Login
    }]
})
//路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (JSON.stringify(store.state.userinfo)!='{}') {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

export default router