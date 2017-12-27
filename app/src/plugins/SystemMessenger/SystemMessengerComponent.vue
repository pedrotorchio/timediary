<script>
export default {
  name: 'SystemMessenger',
  props: {
    position: {
      default: 'bottom'
    }
  },
}
</script>
<template>
  <div id="system-messenger-plugin" :class="position"></div>
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
  transition-property: color, background-color, padding, top, bottom, left, right; /*color, max-height, min-height, min-width, max-width, padding;*/
}
.bottom.shown{
 bottom:0; 
}
.top, .bottom{
  left: 0;
  right: 0;
  width: 100%;
  max-height: 240px;
}
.bottom{
  bottom: -240px;
}
.top{
  top: -240px;
}
div{
  padding: 30px;  
}
</style>
