// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {googleClientConfig, apiUrl} from '@/config.js';


import TimeDiaryApi from '@/plugins/TimeDiaryApi/TimeDiaryApi'
import {baseUrl} from '@/config';

import GoogleLoginApi from '@/plugins/GoogleLoginApi/GoogleLoginApi';

import SystemMessenger from '@/plugins/SystemMessenger/SystemMessenger';

import store from './store';

Vue.config.productionTip = false

Vue.use(TimeDiaryApi, {
  baseUrl: apiUrl
});
Vue.use(GoogleLoginApi, {
    client_id: googleClientConfig.id,
    scope: googleClientConfig.scope
});
Vue.use(SystemMessenger);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
  }
})
