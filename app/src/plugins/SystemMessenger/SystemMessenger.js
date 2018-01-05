/*********
 * PRECISA USAR A API CORRETA PARA QUEUE
 * PRECISA IMPLEMENTAR OS MÉTODOS PUSH(MESSAGE), INTERRUPT(MESSAGE) E DISMISS()
 */
import SystemMessengerComponent from './SystemMessengerComponent.vue';
import DOMMessenger from './DOMMessenger';
import Message from './Message';
import Queue from 'fifo';

class SystemMessenger{
    constructor(options){
        options = options || {};
        options.colors = options.colors || {};

        this.DURATION_LONG      = options.long || 4000;
        this.DURATION_NORMAL    = options.normal || 2000;
        this.DURATION_SHORT     = options.short || 500;
        this.DURATION_STAY      = -1;

        this.colors = {};
        this.colors.alert = options.colors.alert || '#ff5722';
        this.colors.error = options.colors.error || '#ff0033';
        this.colors.info  = options.colors.info  || '#326786';
        this.colors.warn  = options.colors.warn  || '#D36947';
        this.colors.cheer = options.colors.cheer || '#329462';
        
        this.messenger = null;
        this.delay     = options.delay || 500;
        this.currTimer = null;
        this.isRunning = false;
        this.queue     = Queue();

        this.readyCallback = null;
    }
    
    whenReady(callback){
        this.readyCallback = callback;
    }
    init(){

        this.messenger = new DOMMessenger('#system-messenger-plugin');
        this.messenger.setStyle('transitionDuration', `${this.delay}ms`);
        
        if(this.readyCallback !== undefined)
            this.readyCallback();

        return this;
    }
    interrupt(message, humor, duration){
        if(typeof message === 'string')
            message = this.__makeMessage(message, humor, duration);
        this.queue.unshift(message);
        this.dismiss();
        return this;
    }
    dismiss(){
        clearTimeout(this.currTimer);
        this.__hide()
            .then(()=>this.__process());
    }
    push(message, humor, duration){
        if(typeof message === 'string')
            message = this.__makeMessage(message, humor, duration);

        this.queue.push(message);
        this.__execute();
    }
    __makeMessage(text, humor, duration){
        
        if(typeof humor === 'number'){
            duration = humor;
            humor    = null;
        }

        let m = new Message();
            m.text = text;
            m.humor = humor || 'info';
            m.duration = duration || this.DURATION_NORMAL;
        return m;
    }
    __execute(){        
        if(!this.isRunning)
            this.__process();
    }
    __process(){
        this.isRunning = true;
        
        if(this.queue.length < 1)
            this.isRunning = false;
        else{
            this.__display(this.queue.shift())
                .then(()=>this.__process());
        }
            
    }
    __display(message){
        return new Promise(resolve=>{
            
            this.messenger.setText(message.text);
            this.messenger.setHumor(message.humor);
            if(this.colors[message.humor] !== undefined)
                this.messenger.setStyle('backgroundColor', this.colors[message.humor]);

            
            this.__show()
                .then(()=>{                    
                    if(message.duration !== this.DURATION_STAY)            
                        this.currTimer = setTimeout(()=>{
                            this.__hide()
                                .then(resolve);
                        }, message.duration);
                });
            
        });
            
    }
    __halt(){
        this.isRunning = false;
    }
    __show(){
        return new Promise(resolve=>{
                   
            this.messenger.addClass('shown');
            this.currTimer = setTimeout(resolve, this.delay);
        });
    }
    __hide(){
        return new Promise(resolve=>{
            
            this.messenger.removeClass('shown');
            this.currTimer = setTimeout(resolve, this.delay);
        })
    }
}

export default {
    install: function(Vue, options){
      Vue.prototype.$sysMsg = new SystemMessenger(options);
      Vue.component('system-message', SystemMessengerComponent);
  
      Vue.mixin({
        mounted(){
          if(!this.$parent){
            this.$sysMsg.init();
          }
        
        }
      })
    }
  };
  