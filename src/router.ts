import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/dashboard/index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history', //history 模式路径没有#，需要后端配合
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Login.vue')
    },
  ]
})
