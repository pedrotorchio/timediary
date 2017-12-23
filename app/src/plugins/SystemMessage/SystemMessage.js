import SystemMessageComponent from './SystemMessageComponent.vue';

class SystemMessage{
  constructor(options){
    options = options || {};
    this.selector = options.selector || '#system-message';

    this.NORMAL_DURATION = options.normalDuration || '2000';
    this.SHORT_DURATION  = options.shortDuration || '1000';
    this.LONG_DURATION   = options.longDuration || '4000';
    this.__currentClass = null;
    this.__classes = options.classes || {
      alert: '#ff5722',
      error: '#ff0033',
      info: '#326786',
      warn: '#D36947',
      cheer: '#329462'
    }
    this.__element = null;
    this.__readyCallback = null;
  }
  whenReady(callback){
    this.__readyCallback = callback;
  }
  init(){
    this.__element = document.querySelector(this.selector);
    if(this.__readyCallback !== null)
      this.__readyCallback();
  }
  showAlertMessage(message, duration){
    duration = duration || this.NORMAL_DURATION;
    return this.showMessage(message, 'alert', duration);
  }
  showErrorMessage(message, duration){
    duration = duration || this.NORMAL_DURATION;
    return this.showMessage(message, 'error', duration);
  }
  showInfoMessage(message, duration){
    duration = duration || this.NORMAL_DURATION;
    return this.showMessage(message, 'info', duration);
  }
  showWarningMessage(message, duration){
    duration = duration || this.NORMAL_DURATION;
    return this.showMessage(message, 'warn', duration);
  }
  showCheeringMessage(message, duration){
    duration = duration || this.NORMAL_DURATION;
    return this.showMessage(message, 'cheer', duration);
  }
  __removeClass(){
    if(this.__currentClass !== null)
      this.__element.classList.remove(this.__currentClass);
    this.__currentClass = null;
  }
  __getClassName(humor){
    return humor;
  }
  __getColor(humor){
    if(this.__classes[humor] !== undefined)
      return this.__classes[humor];

    return '#000';
  }
  __setBgColor(color){
    this.__element.style.backgroundColor = color;
  }
  __setClass(className){
    this.__currentClass = className;
    this.__setBgColor(this.__getColor(className));
  }
  __defineClass(humor){
    let className = this.__getClassName(humor)
    this.__removeClass();
    this.__setClass(className);
  }
  __addClass(className){
    this.__element.classList.add(className);
  }
  __setText(text){
    this.__element.innerText = text;
  }
  __show(duration){
    return new Promise((resolve, reject)=>{

      if(this.__element == null){
        reject();
        return;
      }

      this.__addClass('shown');

      setTimeout(()=>{
        this.__element.classList.remove('shown');
        setTimeout(()=>{
          this.__removeClass();
          this.__setText('');

          resolve();
        }, 500);
      }, duration);
    });
  }
  showMessage(message, humor, duration){
    this.__setText(message);
    this.__defineClass(humor);

    return this.__show(duration);
  }
}

export default {
  install: function(Vue, options){
    let sys = new SystemMessage(options);
    Vue.prototype.$sysMsg = sys;
    Vue.component('system-message', SystemMessageComponent);

    Vue.mixin({
      mounted(){
        if(!this.$parent)
          this.$sysMsg.init();
      }
    })
  }
};
