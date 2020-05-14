import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/header',
    component: () => import('../components/Header.vue')
  },
  {
    path: '/footer',
    component: () => import('../components/Footer.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/registered',
    component: () => import('../components/Registered.vue')
  },
  {
    path: '/sheet',
    component: () => import('../components/Common/sheet.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
