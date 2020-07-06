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
import Deliveryaddress from '../views/personal/components/Deliveryaddress.vue'
import Addaddress from '../views/personal/components/addressCom/Addaddress.vue'
import Feedback from '../views/personal/components/Feedback.vue'
import Myvip from '../views/personal/components/Myvip.vue'
import Order from '../views/personal/components/Order.vue'

import Shopcart from '../views/shopcart/Shopcart.vue'
import Eat from '../views/recommend/Eat'

import GoodDetails from '../components/GoodDetails.vue'
import Login from '../components/Login.vue'
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err => err);
}
const router = new Router({
    routes: [{
        path: '/',
        redirect: '/index',
        // 是否数据缓存
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
            },
            {
                path:'coupon',
                name:'coupon',
                component:Coupon,
            },{
                path:'deliveryaddress',
                name:'deliveryaddress',
                component:Deliveryaddress,
                children:[{
                    path:'addaddress',
                    name:'addaddress',
                    component:Addaddress,
                }]
            },{
                path:'feedback',
                name:'feedback',
                component:Feedback,
            },{
                path:'myvip',
                name:'myvip',
                component:Myvip,
            },{
                path:'order',
                name:'order',
                component:Order,
            }]
           
        },{
            path:'map',
            name:'map',
            component: Map,
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
export default router