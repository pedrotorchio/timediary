// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import {googleClientConfig, apiUrl} from '@/config.js';
import GoogleLoginApi from '@/plugins/GoogleLoginApi/GoogleLoginApi';
Vue.use(GoogleLoginApi, {
  client_id: googleClientConfig.id,
  scope: googleClientConfig.scope
});

import Vuetify from 'vuetify';
import ('../node_modules/vuetify/dist/vuetify.min.css');
Vue.use(Vuetify,{
  theme: {
    primary: '#326786',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});

import SystemMessenger from '@/plugins/SystemMessenger/SystemMessenger';
Vue.use(SystemMessenger);

import router from './router'
import store from './store';

Vue.config.productionTip = false
window.DIARY = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
  }
});