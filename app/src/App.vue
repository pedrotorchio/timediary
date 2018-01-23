<template>

  <v-app id="main">
    <router-link v-if='showGuardedUi' id="dash-link"  class='pulse' :to="{name: 'Dashboard'}" color='orange'><v-icon>dashboard</v-icon></router-link>
    
    <header-bar id="header-bar" v-if='showGuardedUi'></header-bar>
    <side-tab-container v-if='showGuardedUi' :tabs='moduleTabs' position='left' :topPosition='200'/>

    <router-view class="page blurIn"/>
    
    <side-tab-container v-if='showGuardedUi' :tabs='configTabs' position='right' :topPosition='200'/>    
    <system-message></system-message>
  </v-app>

</template>

<script>
import HeaderBar from '@/components/header/HeaderBar';
import SideTabContainer from '@/components/sidetab/SideTabContainer';
import {mapState} from 'vuex';

export default {
  name: 'app',
  components: {HeaderBar, SideTabContainer},

  mounted(){
    if(this.showGuardedUi)
      greetings(this.$sysMsg, this.displayName);

  },
  computed:{
    ...mapState({
      displayName: state=>state.account.info.pers_display_name,
      showGuardedUi: state => state.ui.uiLogged,
      moduleTabs: state => state.modules.sidetabs,
      configTabs: state => state.configurations.configTabs
    })
  }
}
function greetings(sm, displayName){
  
  sm.interrupt(`Olá, ${displayName}, seja bem vindo.`, 'cheer', sm.DURATION_LONG);

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

#header-bar{
  flex: 0 0 auto;
}
.page{
  flex: 1 0 auto;

  width: 100%;
  margin: 0 auto;
  padding: 4px;
  @media screen and (min-width: 678px){
    width: 90%;
    width: calc(100% - 48px * 2);
    padding: 16px;    
  }
}
#dash-link{
  position: fixed;
  left: 8px;
  top: 8px;
  animation-duration: 4s;
}

</style>
<style lang="scss" src='./assets/styles/global.scss'>
</style>
