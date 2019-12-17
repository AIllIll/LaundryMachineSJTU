import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    }
  ]
})