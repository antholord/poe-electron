import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueElectron from 'vue-electron';

Vue.config.productionTip = false;

Vue.use(VueElectron as any);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
