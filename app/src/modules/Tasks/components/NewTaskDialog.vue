<script>
import {scaleLinear} from 'd3';
import pad from 'zero-pad';

const colorScale = scaleLinear()
                    .domain([0,7])
                    .range(['#fee8e7', '#e8e0f5']);
export default {
  props:{
    value:{
      type:Object,
      default: ()=>({
        title: '',
        start: 360,
        company: '',
        location: '',
        duration: 0,
        independency_lvl: 1,
        category: '',
        shown: false
      })
    }
  },
  data(){
    return {
      sliderColor: colorScale(this.value.independency_lvl)
    }
  },
  computed:{
    startFormated: {
      set(value){
        
        if(value.length < 4 || this.inicioRange(value) !== true)
          return;
        
        const hr = value.substring(0,2);
        const mn = value.substring(2, 4);
        const hm = parseInt(hr)*60 + parseInt(mn);

        // console.log(hr, mn, hm);
        // this.value.start = 
      },
      get(){
        return `${pad(Math.floor(this.value.start/60))}:${pad(this.value.start%60)}`;
      }
    }
  },
  methods:{
    inicioRange(value){
      if(value.length < 4)
        return true;
      value = parseInt(value);
      return value < 2360 && value > 0 || 'Hora inválida';
    },
    changed(){
      const data = {
        title: this.$refs.title.value,
        location: this.$refs.location.value,
        company: this.$refs.company.value,
        duration: this.$refs.duration.value,
        independency: this.$refs.independency.value,
        start: this._start,
        shown: this.shown
      };
      // this.$emit('input', data);
    },
    indepChange(){
      const lvl = this.value.independency_lvl;
      this.sliderColor = colorScale(lvl);
      this.changed();
    },
    submit(){

    }
  }
}
</script>
<template>
  <section :class="{shown: value.shown}" class="newtaskdialog" :style="{backgroundColor: sliderColor}">
      <header>
        <span class="title">
          Nova Atividade 
        </span>
        <v-btn flat icon color='primary' class="close-btn" @click="value.shown = false; changed()">
          <v-icon>clear</v-icon>
        </v-btn>
      </header>
      <v-text-field @input='changed' ref='title' class="regular" v-model="value.title" label='Titulo' color='primary'></v-text-field>
      <v-text-field @input='changed' ref='location' class="regular" v-model="value.location" label='Local' color='primary'></v-text-field>
      <v-text-field @input='changed' ref='company' class="regular" v-model="value.company" label='Companhia' color='primary'></v-text-field>
      <v-text-field @input='changed' ref='duration' suffix='min' class="regular" v-model="value.duration" label='Duração' color='primary'></v-text-field>
      <v-slider @input='indepChange' max='7' min='1' ref='independency' label='Independência' class="regular" v-model="value.independency_lvl" color='primary' thumb-label step="1"></v-slider>
      <v-text-field label='Início' hint='ex 08:25'  :rules='[inicioRange]' mask='##:##' v-model='startFormated'  color='primary'></v-text-field>      
      <v-btn @click='submit' color='accent' class="btn-submit">Salvar</v-btn>
  </section>
</template>
<style scoped lang='scss'>
.btn-submit{
  color: white !important;
}
.fieldset{
  display: flex;
}
header{
  display:flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  text-transform: uppercase;
  height: 40px;
  .title{
    flex: 1 0 0;
  }
}
section{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    background-color: white;
    padding: 16px;
    opacity: 0;
    transition: {
      property: transform, opacity;
      duration: .4s, .2s;
      timing-function: cubic-bezier(0.000, 0.605, 0.000, 0.850);
    };
    transform: scale(0);
    transform-origin: 0 0;
    
    &.shown{
      transform: scale(1);
      opacity: .95;
    }
    input{
      font-size: 16px;
    }
}
</style>
