<script>
import * as d3 from 'd3';
import Chart from './Chart';

function randomCoords(count = 100){
    let lines = [];
    for (let x = 0; x <= count; x++){
        lines.push({
            x, 
            y: ((Math.random() * .5 * x + .5*x)).toFixed(2)
        });
    }
    return lines;
}
function randomData(){
    return [
        {
            data: randomCoords(100),
            strokeWidth: 5,
            color: 'orange'
        }
    ];
}
export default {
  extends: Chart,
  props:{
      lines: {
          type: Array,
          default: []
      },
      domain:{
          type: Array,
          required: true
      }
  },
  data(){
      return {
          xScale: null,
          yScale: null
      }
  },
  methods:{
    generateLineD(parameters){
        console.log(parameters);
        let line = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x((d) => this.xScale(d.x))
                    .y((d) => this.yScale(d.y));
                    
        return line(parameters);
    },
    initialize(){
        this.calculateXscale();
        this.calculateYscale();
    },
    calculateXscale(){
        let min = 9999999999;
        let max = -999999999;

        this.lines.forEach(line => {
            let [minor, major] = d3.extent(line.data, coord=>coord.x);
            
            if(minor < min || min == 9999999999)
                min = minor;
            if(major > max || max == -999999999)
                max = major;
        });
    
        this.xScale = d3.scaleLinear().domain([min, max]).range([0, this.width]);
    },
    calculateYscale(){
        
        this.yScale = d3.scaleLinear().domain(this.domain).range([this.height, 0]);
    }
  },
  created(){
      this.initialize();
  }
}
</script>
<template>
    
        <svg :height='height' :width='width' style="border: 1px solid black">

            <g v-for='(line, i) in lines' :key='i'>
                <path :d='generateLineD(line.data)' 
                    :stroke="line.color || 'black'" 
                    :fill="line.fill || 'none'"
                    :stroke-width="line.strokeWidth || 2" ></path>
                <circle v-if='!(line.dots === false)' v-for="point in line.data" 
                    :cx='xScale(point.x)' 
                    :cy="yScale(point.y)" 
                    :r='(line.strokeWidth || 2)*1.2' 
                    :fill="line.color || 'black'"></circle>
            </g>
            


        </svg>
        
    
</template>
<style>

</style>