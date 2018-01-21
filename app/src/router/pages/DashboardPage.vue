<script>
import {mapState} from 'vuex';

  export default {
    name: 'DashboardPage',
    data(){
      return {

      }
    },
    mounted(){
      function logout(){
        this.$store.commit('account/logout');
      }
    },
      computed:{ 
        ...mapState({
          widgets: state=>state.modules.widgets
        })
    }
  } 
</script>


<template>
  <div id="dashboardPage" class="page">
    <section id="widgets" >
      <component v-for='widget in widgets' :key='widget.uid' :is="widget.component" :class='{fullWidth: widget.fulWidth}' class="widget elevation-2"></component>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  #widgets{
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 4px;
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    @media screen and (min-width: 678px){
      width: 90%;
      width: calc(100% - 48px * 2);
      padding: 16px;    
    }

    .widget{
      $margin: 8px;
      padding: 8px;
      flex: 0 1 100%;
      max-width: 100%;
      margin: $margin;
      

      &.fullWidth{
        max-width: 100% !important;
        flex-basis: 100% !important; 
      }
      @media screen and (min-width: 678px){
        flex-basis: 40%;        
        flex-basis: calc(50% - 2 * #{$margin});
      }
      @media screen and (min-width: 1200px){
        flex-basis: 30%;
        flex-basis: calc(#{100%/3} - 2 * #{$margin});
      }
    }

  }

</style>
