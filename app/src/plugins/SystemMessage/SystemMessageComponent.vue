<script>
export default {
  name: 'SystemMessage',
  props: {
    position: {
      default: 'bottom'
    }
  },
  
}
</script>
<template>
  <div id="system-message" :class="position">
    <p>

    </p>
  </div>
</template>
<style scoped>
/*
alert
error
info
warn
cheer
*/
div{
  font-weight: 600;
  position: fixed;
  padding: 0;
  font-size: 40px;
  color: white;
  transition-property: color, height, width, padding;
  transition-duration: .5s;
}
.shown{
  padding: 30px;
}
.top, .bottom{
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
}
.top.shown, .bottom.shown{
  height: 120px;
}
.bottom{
  bottom: 0;
}
.top{
  top: 0;
}
.left, .right{
  top: 0;
  bottom: 0;
  height: 100%;
  width: 0;
}
.left.shown, .right.shown{
  width: 120px;
}
.left{
  left: 0;
}
.right{
  right: 0;
}
</style>
