<script>
export default {
  name: 'SystemMessenger',
  props: {

  },
}
</script>
<template>
  <div  id="system-messenger-plugin" class='bottom'></div>
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
  transition-property: color, background-color, padding, top, bottom;
}
.bottom.shown{
 bottom:0 !important; 
}
.top, .bottom{
  left: 0;
  right: 0;
  width: 100%;
  
  
  /* max-height: 240px; */
}
.bottom{
  bottom: -500px;
}
.top{
  /* top: -240px; */
}
div{
  padding: 30px;  
}
</style>
