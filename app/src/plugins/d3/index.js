import Barchart from './Barchart';

export default {
    install: function(Vue, options){
      Vue.component('d3-barchart', Barchart);
    }
  };