import axios from 'axios';
import AuthService from './AuthService';
class TimeDiaryApi{
  constructor(options){
    options = options || {};
    this.baseUrl = options.baseUrl || '';
    this.errorCallback = null;

    this.auth = new AuthService(this.baseUrl);
  }
  login(email, password){
    return this.repromise(this.auth.login(email, password));
  }
  repromise(promise){
    return new Promise((resolve, reject)=>{
      promise.then(resolve)
             .catch(error=>{
               if(this.errorCallback)
                this.errorCallback(error.data, error.response);

               reject(error);
             });
    })
  }
  onError(callback){
    this.errorCallback = callback;
  }
}
export default {
  install: function(Vue, options){
    Vue.prototype.$TDAPI = new TimeDiaryApi(options);
  }
};
