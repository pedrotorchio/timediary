// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {googleClientConfig, apiUrl} from '@/config.js';


import TimeDiary from '@/plugins/TimeDiary/TimeDiaryPlugin'
import {baseUrl} from '@/config';
import Tasks from '@/modules/Tasks/TimeDiaryTasks';
Vue.use(TimeDiary, {
  baseApiUrl: apiUrl,
  nativeModules:[
    Tasks
  ]
});

import GoogleLoginApi from '@/plugins/GoogleLoginApi/GoogleLoginApi';
Vue.use(GoogleLoginApi, {
  client_id: googleClientConfig.id,
  scope: googleClientConfig.scope
});

import SystemMessenger from '@/plugins/SystemMessenger/SystemMessenger';
Vue.use(SystemMessenger);

import store from './store';

Vue.config.productionTip = false

window.APP = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
  }
});