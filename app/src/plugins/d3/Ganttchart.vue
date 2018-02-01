<script>
import Chart from "./Chart";
import * as d3 from 'd3';

export default {
  extends: Chart,
  props: {
    id:{
      type:String,
      default: ''
    },
    colorDomain:{
      type:Array,
      required: true
    },
    colorRange:{
      type:Array,
      required: true
    },
    lineHeight: {
      type: Number,
      default: 30
    },
    interceptionLabel:{
      type:String
    },
    topInterval:{
      type:Number,
      default: 15
    },
    bottomInterval:{
      type:Number,
      default: 60
    },
    tasks: {
      type: Array,
      default: () => []
    },
    durationProperty:{
      type:Function,
      default: null
    },
    colorProperty:{
      type:Function,
      required:true
    },
    endProperty: {
      type: Function,
      default: a => a.end
    },
    startProperty: {
      type: Function,
      default: a => a.start
    },
    titleProperty:{
      type:Function,
      default: a => a.title
    },
    displayFormat:{
      type:Function,
      default: a=>a.start
    }
  },
  data() {
    return {
      xWidth: 0,
      yHeight: 0,
    };
  },
  computed:{
    extentBreadth(){
      return this.roundedExtent[1] - this.roundedExtent[0];
    },
    colorScale(){
      return d3.scaleLinear()
        .domain(this.colorDomain)
        .range(this.colorRange);
    },
    yScale(){
      return d3.scaleBand()
        .domain([...this.orderedTaskTitles])
        .range([0, this.yHeight])
    },
    xScale(){
      return d3.scaleLinear()
        .domain([...this.roundedExtent])
        .range([0, this.xWidth])
    },
    widthScale(){
      return d3.scaleLinear()
        .domain([0, this.roundedExtent[1] - this.roundedExtent[0]])
        .range([0, this.xWidth])
    },
    orderedTaskTitles(){
      let tasks = this.orderedTasks;
      let activities = [...(new Set(
        tasks.map(this.titleProperty)
      ))];

      return activities;
    },
    orderedTasks(){
      let tasks = [...this.tasks];
      tasks.sort((a, b) => {
        return this.startProperty(a) - this.startProperty(b);
      });

      return tasks;
    },
    reverseOrderedTasks(){
      let tasks = [...this.tasks];
      tasks.sort((a, b) => {
        return this.endProperty(b) - this.endProperty(a);
      });
      return tasks;
    },
    extent(){
      let extent = [0,0];

      const regular = this.orderedTasks;
      const reverse = this.reverseOrderedTasks;
      const size    = reverse.length;

      if(size > 0){
        const start = this.startProperty(regular[0]);
        const end = this.endProperty(reverse[0]);

        extent = [start, end];
      }
      return extent;
    },
    roundedExtent(){
      let [start, end] = this.extent;

          start = Math.floor(start/60)*60;
          end   = Math.ceil(end/60)*60;

      return [start, end];      
    }
  },
  methods: {
    durationRead(task){
      let durationProperty = this.durationProperty || (task => this.endProperty(task) - this.startProperty(task));
      return durationProperty(task);
    },
    range(to, from = 0, step = 1){
      let arr = [];
      
      for(; from < to; from+=step){
        arr.push(from);
      }
      return arr;
    },
    lineTop(index){
      return index * this.lineHeight;
    },
    onResize(){
      const canvas = this.$refs.canvas;

      this.xWidth = canvas.clientWidth;
      this.yHeight = canvas.clientHeight;

    },
    indexed_1_XValue(indexFrom1, step = 15){
      indexFrom1 = indexFrom1-1;
      return indexFrom1 * step + this.roundedExtent[0];
    },
    columnClick(index, event){
      const canvasBox = this.$refs.canvas.getBoundingClientRect();
      
      const x = event.clientX - canvasBox.left;
      const y = event.clientY - canvasBox.top;
      
      const start = Math.floor(
          this.xScale.invert(x) / this.topInterval
        ) * this.topInterval;
      const taskTitle = this.orderedTaskTitles[Math.floor(y/this.lineHeight)];
      
      this.$emit('columnClick', {taskTitle, start, index, event, canvasBox})
    }
  },

  watch:{
    tasks(newValue, oldValue){
      setTimeout(this.onResize, 100);
    }
  }
};
</script>

<template>
  <div :id='id' class="gantt" :style="{width, height, gridTemplateRows: `${lineHeight}px 1fr ${lineHeight}px`}">
    
    <section class="left-axis" :style="{minHeight: `${lineTop(orderedTaskTitles.length)}px`}">
      <h3 v-for='(title, i) in orderedTaskTitles' 
      :key='title'
      :style="{height: `${lineHeight}px`}"
      >{{title}}</h3>
    </section>
    <h3 class="interception">{{interceptionLabel}}</h3>

    <section class="top-axis">
      <span v-for="i in range(extentBreadth/topInterval, 0)" :key='i' class="x-top-values" 
        :style="{width: `${widthScale(topInterval)}px`}"
        :class="{pivot: (i == 0 || (i%4 == 0))}" >{{i%4 * topInterval || '00'}}</span>
    </section>

    <section class="canvas" ref='canvas'>
      <article class="task-bar" v-for="(task) in orderedTasks" :key='task.id+task.title'
      :style="{
        left: `${xScale(startProperty(task))}px`, 
        top: `${yScale(titleProperty(task))}px`, 
        height: `${lineHeight}px`,
        width: `${widthScale(durationRead(task))}px`,
        backgroundColor: colorScale(colorProperty(task))
        }"
        >{{titleProperty(task)}}</article>
      <span v-for="i in range(extentBreadth/topInterval, 0)" :key='i' class="x-ticks" 
        @click.stop="columnClick(i, $event)"
        :style="{width: `${widthScale(topInterval)}px`}"
        :class="{pivot: (i == 0 || (i%4 == 0))}" ></span>
    </section>

    <section class="bottom-axis">
      <span v-for="i in range(extentBreadth/bottomInterval, 0)" :key='i' class="x-bottom-values" 
        :style="{width: `${widthScale(bottomInterval)}px`}"        
        >{{displayFormat(i*bottomInterval + roundedExtent[0])}}h</span>
      </span>
    </section>
    
  </div>
</template>
<style scoped lang='scss'>
$secondary: '#ff7700';
$tickWidth: 2px;
.x-ticks{
  height: 100%;
  border-left: 1px solid;
  border-left-color: lightgrey;
  background-color: rgba(211, 211, 211, 0.2);
  display: inline-block;
  &.pivot{
    border-left-color: grey;
    background: rgba(128, 128, 128, 0.2);
  }
}
.x-bottom-values{
  text-align: left;
  font-weight: 600;
}
.x-top-values{
  font-size: 12px;
  text-align: left;
  font-weight: 100;
  &.pivot{
    
  }
}
$leftAxisWidth: 150px;

.gantt{
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 5px;
  grid-gap: 5px;
}
.cell{
  // cell
  padding: 0;
}
// 1 2
.top-axis{
  @extend .cell;
  margin-bottom: -5px;
  display: flex;
  align-items: flex-end;
  grid-row: 1;
  grid-column: 2;
}
// 2 1
.left-axis {
  @extend .cell;
  
  min-width: $leftAxisWidth;
  position: relative;
  grid-column: 1;
  grid-row: 2;
  & > h3 {
    padding: 0 5px;
    text-align: right;
    right: 4px;
  }

}
// 2 2
.canvas{
  @extend .cell;
  
  position: relative;
  grid-column: 2;
  grid-row: 2;
  .x-ticks{
    cursor: pointer;
    cursor: crosshair;
    cursor: cell;
    cursor: copy;


    &:hover{
      background-color: unquote($secondary + '55');
    }
    &.selected, &:hover{
      outline: solid;      
      outline-color: unquote($secondary + 'AA')
    }
  }
  .task-bar{
    position:absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    color: white;
    font-weight: 600;
    font-size: 10px;
    line-height: .8em;
    text-shadow: 1px 1px black;
    cursor: pointer;
    cursor: context-menu;
    transition: {
      property: color, width, border-color, background-color;
      duration: .4s;
    };
  }
}

// 1 3
.interception{
  @extend .cell;
  
  display: flex;
  align-items: center;
  justify-content: flex-end;  
  font-weight: 200;
  font-size: 16px;
  grid-column: 1;
  grid-row: 3;
}
//2 3

.bottom-axis{ 
  @extend .cell;
  margin-top: -2px;
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  font-weight: 400;
  grid-column: 2;
  grid-row: 3;
  display: flex;
  flex-direction: row;
}
</style>


