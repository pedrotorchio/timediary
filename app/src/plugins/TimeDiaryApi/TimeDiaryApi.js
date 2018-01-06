import axios from 'axios';
import AuthService from './AuthService';
import AccountService from './AccountService';
class TimeDiaryApi{
  constructor(options){
    options = options || {};
    this.baseUrl = options.baseUrl || '';
    this.errorCallback = null;
    this.authToken = null;
    this.auth = new AuthService(this.baseUrl);
    this.account = new AccountService(this.baseUrl);
  }
  login(email, password){
    return this.repromise(this.auth.login(email, password));
  }
  getAccountInformation(email){
    return this.repromise(this.account.getInfo(email, this.__authorizationOptions()));
  }
  setToken(token){
    this.authToken = token;
  }
  repromise(promise){
    return new Promise((resolve, reject)=>{
      promise
            .then(resolve)
            .catch(error=>{
              if(this.errorCallback)
              this.errorCallback(error);

              reject(error);
            });
    });
  }
  onError(callback){
    this.errorCallback = callback;
  }
  hasToken(){
    return authToken !== null;
  }
  __authorizationOptions(){
    return {
      headers: {
        Authorization: this.authToken
      }
    }
  }
}
export default {
  install: function(Vue, options){
    Vue.prototype.$TDAPI = new TimeDiaryApi(options);
  }
};
