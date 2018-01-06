import googleapi from 'google-client-api';

let gapi = null;
let resolve = null;
let reject  = null;

class GoogleLoginApi{
  constructor(options){
    options = options || {};

    this.__load = 'client:auth2' + (options.load || '');
    delete options.load;

    this.__initOptions = options;
    this.__readyCallback = null;
    this.__errorCallback = null;
    this.__googleUser = null;
  }
  login(){
    gapi.auth2.getAuthInstance().signIn()
    .then(googleUser=>{

      this.__googleUser = googleUser;

      gapi.client.plus.people.get({
        userId: 'me'
      })
      .then(resp=>{
        
        if(this.__signedInCallback)
          this.__signedInCallback(resp.result);
      })
      .catch(this.__loadingError);

    })
    .catch(this.__loadingError);
  }
  logout(){
    gapi.auth2.getAuthInstance().signOut()
      .then(()=>{
        if(this.__signedOutCallback)
          this.__signedOutCallback
      })
      .catch(this.__loadingError);
  }
  setSignedInCallback(callback){
    this.__signedInCallback = callback;
  }
  setSignedOutCallback(callback){
    this.__signedOutCallback = callback;
  }

  loadGapi(){
    googleapi()
      .then((_gapi=>{
        gapi = _gapi;
        window.gapi = gapi;
        this.__loadLibs();
      }))
      .catch(this.__loadingError);
  }
  __loadLibs(){

    if(this.__load !== null)
      gapi.load(this.__load, ()=>{

        gapi.client.init(this.__initOptions)
          .then(()=>{
              gapi.client.load('https://www.googleapis.com/discovery/v1/apis/plus/v1/rest')
              .then(()=>{
                // gapi.auth2.getAuthInstance().isSignedIn.listen(this.__updateSigninStatus);

                this.__allLoaded();
              })
          })
          .catch(this.__loadingError);
    })
    else
      this.__allLoaded();
  }
  __allLoaded(){
    document.querySelector('body')
      .classList.add('gapi-loaded');

    if(this.__readyCallback)
      this.__readyCallback();
  }
  whenReady(callback){
    this.__readyCallback = callback;
  }

  __loadingError(error){
    console.error('GoogleLoginApi', error);
    if(this.__errorCallback)
      this.__errorCallback(error);
  }
  onError(callback){
    this.__errorCallback = callback;
  }
}

export default {
  install: function(Vue, options){
    let api = new GoogleLoginApi(options);
    Vue.prototype.$googleLogin = api;

    Vue.mixin({
      mounted() {
        if(!this.$parent && this.$route && this.$route.path == '/'){
          api.loadGapi(options);
        }
      }
    });
  }
};
