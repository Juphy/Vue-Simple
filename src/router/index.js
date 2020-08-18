import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const routes = [{
    path: '/',
    component: () => import('../components/Layout'),
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'Home',
        alias: '/',
        meta: {
            title: '首页',
            keepAlive: false
        },
        component: () => import('../components/Home.vue')
    }, {
        path: '/about',
        name: 'About',
        meta: {
            title: '关于',
            keepAlive: false
        },
        component: () => import("../components/About")
    }, {
        path: '/tomato',
        name: 'Tomato',
        meta: {
            title: '番茄',
            keepAlive: false
        },
        component: () => import("../components/Tomato")
    }]
}]

export default new Router({
    mode: 'history',
    routes
})