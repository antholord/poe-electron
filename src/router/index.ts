import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import ItemInfo from "../pages/item-info/ItemInfo.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/itemInfo',
    name: 'ItemInfo',
    component: ItemInfo
    //component: () => import(/* webpackChunkName: "itemInfo" */ '../pages/item-info/ItemInfo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
