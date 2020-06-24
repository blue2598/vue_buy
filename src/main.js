// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import store from './store'

import { Toast } from 'vant';

import './js/rem.js'

import 'vant/lib/index.css'
import '../static/css/normal.css'
import '../static/font/iconfont.css'
Vue.use(Vant)
Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})