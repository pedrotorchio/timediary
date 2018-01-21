<script>
import Chart from './Chart';
export default {
  extends: Chart
}
</script>
<template>
  <svg :width='width' :height='height'>
      <g class="axis axis--x" :transform="`translate(0, ${height})`">

      </g>
      <g class="bars">
          <rect class="bar"></rect>
      </g>

  </svg>
</template>
<style>

</style>