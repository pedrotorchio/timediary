// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import TimeDiaryApi from '@/plugins/TimeDiaryApi/TimeDiaryApi'
import {baseUrl} from '@/config';

Vue.config.productionTip = false

Vue.use(TimeDiaryApi, {
  baseUrl: `${baseUrl}/api`
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created(){
  }
})
