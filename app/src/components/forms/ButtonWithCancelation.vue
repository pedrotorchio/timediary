<script>

export default {
  props:{
      text:{
          type: String,
          required: true
      },
      callbackText:{
          type: String,
          required: true
      },
      onComplete:{
          required: true
      },
      totalTime:{
          type:Number
      },
      step:{
          type: Number,
          default: 20
      }
  },
  data(){
      return {
          timeoutTime: 0,
          intervalId: null,
          timeoutId: null
      }
  },
  methods:{
      clear(){
            clearTimeout(this.timeoutId);
            clearInterval(this.intervalId);
            
            this.timeoutTime = 0;
            this.timeoutId = null;
            this.intervalId = null;
      },
      clicked(){
          
        if(this.timeoutId){
            this.clear();
            return;
        }

        let data = this.submitData;
        let max  = this.time;
        
        let timeStep = max * this.stepFraction;
        
        this.timeoutTime += this.step;              
        this.intervalId   = setInterval(()=>{
            
            this.timeoutTime += this.step;              
        }, timeStep);
        
        this.timeoutId = setTimeout(()=>{
            
            let onComplete = this.onComplete[0];
            let id  = this.onComplete[1];
            
            onComplete(id);
            
            this.clear();
        }, max);
      }
  },
  computed:{
      currText(){
          return this.timeoutTime > 0 ? this.callbackText : this.text;
      },
      time(){
          return this.totalTime || 4000;
      },
      stepFraction(){
          return this.step/100;
      }
  }
}
</script>
<template>
<div class="btn-cancelation" >
    <div @click='clicked'>
        <slot name='button' :active='(timeoutTime > 0)' :text='currText'></slot>
    </div>
    <slot name='progress' :value="timeoutTime"></slot>
</div>
</template>
<style scoped lang='scss'>
</style>