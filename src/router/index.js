import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/index/Index.vue'

import Home from '../views/home/Home.vue'
import Category from '../views/category/Category'
import Personal from '../views/personal/Personal'
import Shopcart from '../views/shopcart/Shopcart.vue'
import Eat from '../views/recommend/Eat'

import GoodDetails from '../components/GoodDetails.vue'
Vue.use(Router)

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
        }]
    },{
        path:'/goodDetails',
        name:'GoodDetails',
        component:GoodDetails
    }]
})
export default router