import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'

import Home from '../views/home/Home.vue'
import Category from '../views/category/Category'
import Personal from '../views/personal/Personal'
import Shopcart from '../views/shopcart/Shopcart.vue'
import Eat from '../views/recommend/Eat'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index',
            // 是否数据缓存
            meta: {
                keepAlive: true
            }
        },
        {
            // 根页面 
            path: '/index',
            name: 'index',
            component: Index,
            children: [{
                path: '/index',
                redirect: '/index/home',
            }, {
                path: '/home',
                name: 'home',
                component: Home
            }, {
                path: '/category',
                name: 'category',
                component: Category
            }, {
                path: '/personal',
                name: 'personal',
                component: Personal
            }, {
                path: '/eat',
                name: 'eat',
                component: Eat
            }, {
                path: '/shopcart',
                name: 'shopcart',
                component: Shopcart
            }]
        }
    ]
})