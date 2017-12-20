import axios from 'axios';
class TimeDiaryApi{
  constructor(options){
    this.__urls = {
      accounts: '/accounts'
    };
    this.__fUrls = {};

    this.setBaseUrl(options.baseUrl);
  }
  setBaseUrl(baseUrl){
    this.__baseUrl = baseUrl;
    for(let url in this.__urls){
      if(this.__urls.hasOwnProperty(url)){
        this.__fUrls[url] = `${this.__baseUrl}${this.__urls[url]}`;
      }
    }
  }
  postAccounts(){
    console.log('axios', axios);
    return this;
  }
}
export default {
  install: function(Vue, options){
    Vue.prototype.$TDAPI = new TimeDiaryApi(options);
  }
};
