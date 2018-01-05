import axios from 'axios';
class TimeDiaryApi{
  constructor(options){
    options = options || {};
    this.baseUrl = options.baseUrl || '';

    this.auth = new AuthService(this.baseUrl);
  }
  login(email, password){
    this.auth.login(email, password);
  }
}
export default {
  install: function(Vue, options){
    Vue.prototype.$TDAPI = new TimeDiaryApi(options);
  }
};
