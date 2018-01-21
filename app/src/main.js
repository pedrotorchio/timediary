// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

import d3 from '@/plugins/d3';
Vue.use(d3);

import {googleClientConfig, apiUrl} from '@/config.js';
import GoogleLoginApi from '@/plugins/GoogleLoginApi/GoogleLoginApi';
Vue.use(GoogleLoginApi, {
  client_id: googleClientConfig.id,
  scope: googleClientConfig.scope
});

import axios from 'axios';
axios.defaults.baseURL = apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import Vuetify from 'vuetify';
import ('../node_modules/vuetify/dist/vuetify.min.css');
Vue.use(Vuetify,{
  theme: {
    primary: '#326786',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#F44336'
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

