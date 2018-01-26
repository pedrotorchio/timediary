<script>
import Chart from "./Chart";
import * as d3 from 'd3';

export default {
  extends: Chart,
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    activities: {
      type: Array,
      default: () => {}
    },
    endProperty: {
      type: Function,
      default: a => a.end
    },
    startProperty: {
      type: Function,
      default: a => a.start
    }
  },
  data() {
    return {
      extent: null,
      orderedTasks: [],
      orderedActivities: [],
      sizes:{
        lineHeight: null,
      },
      axis:{
        x: null,
        y: null
      }
    };
  },
  methods: {
    activity2TopPosition(activity){
      if(Number.isInteger(activity))
        activity = this.activities[activity];

      return this.axis.y(activity);
    },
    sortTasks() {

      let tasks = [...this.tasks];

      
      if (tasks.length <= 0) return;

      // final
      tasks.sort((a, b) => {
        return this.endProperty(a) - this.endProperty(b);
      });

      let end = this.endProperty(tasks[tasks.length - 1]);
      // começo

      tasks.sort((a, b) => {
        return this.startProperty(a) - this.startProperty(b);
      });
      let start = this.startProperty(tasks[0]);

      this.orderedTasks = tasks;
      
      return (this.extent = [start, end]);
    },
    extractActivities() {
      
      let orderedTitles = this.orderedTasks.map(task=>{
        let activityId = task.activity;
        
        let activity = this.activities.find(act => {
          
          console.log(act);

          return false;
        });
        
        task.activity = activity;
      });
      
      // this.axis.y = d3.scaleBand().domain(this.orderedActivities).range([0, this.cHeight]);
    },
    initialize() {
      this.sortTasks();
      this.extractActivities();
    }
  },
  created() {
    this.initialize();
  },
};
</script>

<template>
  <div class="gantt" :style="{width, height}">
    {{tasks}}
    <section class="left-axis">
      <h3 :style="{top: `${axis.y(id)}`}" v-for='(id, i) in orderedActivities' :key='id'>{{activities[id]}}</h3>
    </section>
    <section class="canvas">
      <svg ></svg>
    </section>
    <section class="bottom-axis">
      
    </section>
  
  </div>
</template>
<style scoped lang='scss'>
.left-axis {
  width: 200px;
  position: relative;

  & > h3 {
    position: absolute;
    right: 4px;
  }
}
</style>

