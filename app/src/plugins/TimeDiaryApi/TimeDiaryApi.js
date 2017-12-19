import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

const apiUrl = '/api';
const urls = {
  accounts: '/accounts',
};
let fUrl = {};

function appendBaseUrl(baseUrl){
  for(let url in urls){

    if(urls.hasOwnProperty(url)){
      fUrl[url] = `${baseUrl}${apiUrl}${urls[url]}`;
    }
  }
}

const api = {
  install: function(Vue, options){
    appendBaseUrl(options.baseUrl)
    let TimeDiaryApi = {
      postAccount(account){
        // Vue.axios.post
      }
    };



    Vue.prototype.$TDAPI = TimeDiaryApi;
  }
};

export default api;
