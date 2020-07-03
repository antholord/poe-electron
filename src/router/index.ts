import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import ItemInfo from '../pages/item-info/ItemInfo.vue';
import Radial from '../pages/radial/Radial.vue';
import Flasks from '../pages/flasks/Flasks.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/itemInfo',
    name: 'ItemInfo',
    component: ItemInfo
    // component: () => import(/* webpackChunkName: "itemInfo" */ '../pages/item-info/ItemInfo.vue')
  },
  {
    path: '/radial',
    name: 'Radial',
    component: Radial
  },
  {
    path: '/flasks',
    name: 'Flasks',
    component: Flasks
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;
