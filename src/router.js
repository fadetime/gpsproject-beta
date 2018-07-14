import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Times from './views/Times.vue'
import Dirver from './views/Dirver.vue'
import Client from './views/Client.vue'
import Car from './views/Car.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/times',
      name: 'times',
      component: Times
    },
    {
      path: '/dirver',
      name: 'dirver',
      component: Dirver
    },
    {
      path: '/client',
      name: 'client',
      component: Client
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    }
  ]
})
