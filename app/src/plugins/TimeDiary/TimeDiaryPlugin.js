import TimeDiaryApi from './api/TimeDiaryApi';
import load from 'load-script';

class TimeDiary{
  constructor(options){
    this.options = options;
    this.nativeModules = options.nativeModules || [];
    this.__api = new TimeDiaryApi(options);
    this.loadScript = null;
  }

  getModules(email){
    this.nativeModules.forEach(module=>{
      setTimeout(()=>new module());
    });
   this.api().getModules(email)
    .then(modules=>{      
      modules.forEach(module=>{
        load(module);
      })
    });
  }
  api(){
    return this.__api;
  }
  
  
}

export default {
  install: function(Vue, options){
    Vue.prototype.$timeDiary = new TimeDiary(options);
  }
};