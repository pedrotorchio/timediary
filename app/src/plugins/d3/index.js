import Barchart from './Barchart';
import Linechart from './Linechart';
import Ganttchart from './Ganttchart';

export default {
    install: function(Vue, options){
      Vue.component('d3-barchart', Barchart);
      Vue.component('d3-linechart', Linechart);
      Vue.component('d3-ganttchart', Ganttchart);
    }
  };