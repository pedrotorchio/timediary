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
    lineHeight: {
      type: Number,
      default: 30
    },
    interceptionLabel:{
      type:String
    },
    tasks: {
      type: Array,
      default: () => []
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
    yScale(){
      return d3.scaleBand()
        .domain([...this.orderedTaskTitles])
        .range([0, this.yHeight])
        .padding(.1);
    },
    xScale(){
      return d3.scaleLinear()
        .domain([...this.roundedExtent])
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
      const canvas = this.$el.querySelector('.canvas');

      this.xWidth = canvas.clientWidth;
      this.yHeight = canvas.clientHeight;

    },
    indexed_1_XValue(indexFrom1, step = 15){
      indexFrom1 = indexFrom1-1;
      return indexFrom1 * step + this.roundedExtent[0];
    },
    xTickWidth(step = 15){
      return this.xWidth / (this.extentBreadth / step );
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
      <span v-for="i in range(extentBreadth/15, 0)" :key='i' class="x-top-values" 
        :style="{width: `${xTickWidth(15)}px`}"
        :class="{pivot: (i == 0 || (i%4 == 0))}" >{{i%4 * 15 || '00'}}</span>
    </section>

    <section class="canvas">
      <span v-for="i in range(extentBreadth/15, 0)" :key='i' class="x-ticks" 
        :style="{width: `${xTickWidth(15)}px`}"
        :class="{pivot: (i == 0 || (i%4 == 0))}" ></span>
    </section>

    <section class="bottom-axis">
      <span v-for="i in range(extentBreadth/60, 0)" :key='i' class="x-bottom-values" 
        :style="{width: `${xTickWidth(60)}px`}"        
        >{{displayFormat(i*60 + roundedExtent[0])}}h</span>
      </span>
    </section>
    
  </div>
</template>
<style scoped lang='scss'>
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
  margin-top: -5px;
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


