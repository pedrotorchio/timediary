<script>
import * as d3 from 'd3';
import Chart from './Chart';

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
      },
      xStep:{
          type:Number,
          default: 1
      },
      yStep:{
          type:Number,
          default: 1
      }
  },
  data(){
      return {
          xScale: null,
          yScale: null,
          xDomain: null
      }
  },
  methods:{
    generateLineD(parameters){
        let line = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x((d) => this.xScale(d.x))
                    .y((d) => this.yScale(d.y));
                    
        return line(parameters);
    },
    calculateXDomain(){
        let min = 9999999999;
        let max = -999999999;

        this.lines.forEach(line => {
            let [minor, major] = d3.extent(line.data, coord=>coord.x);
            
            if(minor < min || min == 9999999999)
                min = minor;
            if(major > max || max == -999999999)
                max = major;
        });

        this.xDomain = [min, max];

        return this.xDomain;
    },
    initialize(){
        this.calculateXscale();
        this.calculateYscale();
    },
    calculateXscale(){
        this.calculateXDomain();
        this.xScale = d3.scaleLinear().domain(this.xDomain).range([0, this.width]);

        return this.xScale;
    },
    calculateYscale(){
        this.yScale = d3.scaleLinear().domain(this.domain).range([this.height, 0]);

        return this.yScale;
    }
  },
  created(){
      this.initialize();
  }
}
</script>
<template>
        
        <svg :height='height' :width='width' style="border: 1px solid rgba(0,0,0,.1)">

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
            <g class="x-axis">

                <line v-for="x in range(xDomain, xStep || 1)" :x1='xScale(x)' :x2='xScale(x)' :y1='height-5' :y2='height' stroke='black'></line>

            </g>
            <g class="y-axis">

                <line v-for="y in range(domain, yStep || 1)" :x1='0' :x2='5' :y1='yScale(y)' :y2='yScale(y)' stroke='black'></line>                

            </g>
            


        </svg>
        
    
</template>
<style>

</style>