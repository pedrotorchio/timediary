import axios from 'axios';
import AuthService from './AuthService';
import AccountService from './AccountService';
export default class TimeDiaryApi{
  constructor(options){
    options = options || {};
    this.baseUrl = options.baseApiUrl || '';
    this.errorCallback = null;
    this.authToken = null;
    this.auth = new AuthService(this.baseUrl);
    this.account = new AccountService(this.baseUrl);
    this.email = null;
  }

  login(email, password){
    return this.repromise(this.auth.login(email, password));
  }
  getModules(email){
    
      return this.repromise(this.account.getModules(email, this.__authorizationOptions()));
  }
  getAccountInformation(email){

    
    return this.repromise(this.account.getInfo(email, this.__authorizationOptions()));
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

