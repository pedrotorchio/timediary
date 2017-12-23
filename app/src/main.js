// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {googleClientConfig} from '@/config.js';


import TimeDiaryApi from '@/plugins/TimeDiaryApi/TimeDiaryApi'
import {baseUrl} from '@/config';

import GoogleLoginApi from '@/plugins/GoogleLoginApi/GoogleLoginApi';

import SystemMessage from '@/plugins/SystemMessage/SystemMessage';

Vue.config.productionTip = false

Vue.use(TimeDiaryApi, {
  baseUrl: `${baseUrl}/api`
});
Vue.use(GoogleLoginApi, {
    client_id: googleClientConfig.id,
    scope: 'profile https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/plus.login'
});
Vue.use(SystemMessage);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created(){
  }
})
