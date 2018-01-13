<template>

  <v-app id="main">
    <header-bar v-if='showGuardedUi'></header-bar>
    <side-tab-container v-if='showGuardedUi' :tabs='moduleTabs' position='left' :topPosition='200'/>

    <router-view/>
    
    <side-tab-container v-if='showGuardedUi' :tabs='configTabs' position='right' :topPosition='200'/>    
    <system-message></system-message>
  </v-app>

</template>

<script>
import HeaderBar from '@/components/header/HeaderBar';
import SideTabContainer from '@/components/sidetab/SideTabContainer';

export default {
  name: 'app',
  components: {HeaderBar, SideTabContainer},

  mounted(){
    
  },
  computed:{
    showGuardedUi(){
      return this.$store.getters.uiLogged;
    },
    moduleTabs(){
      return this.$store.getters.modulesSidetabs;
    },
    configTabs(){
      return this.$store.getters.configTabs;
    }
  },
  created(){
    
  }
}
</script>

<style lang='scss' scoped>
@import './assets/styles/config';
#main{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: 0;
  min-height: 100vh;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color__text;
}
</style>


<style lang="scss" src='./assets/styles/global.scss'>
</style>
