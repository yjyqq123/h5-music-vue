import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    component: () => import('../components/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
