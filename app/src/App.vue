<template>

    <router-view/>

</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/styles/config';
html{
  overflow-x:hidden;
  overflow-y:scroll;
}
html::-webkit-scrollbar {
    width: .5em;
}

html::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

html::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
body{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  min-height: 100vh;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color__text;
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
</style>
