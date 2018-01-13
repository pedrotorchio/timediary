<script>
  

  export default {
    name: 'DashboardPage',
    data(){
      return {

      }
    },
    mounted(){
      function logout(){
        this.$store.commit('logout');      
      }
      
      greetings(this.$sysMsg, this.accountInfo.pers_display_name);
    },
      computed:{ 
      accountInfo(){
        return this.$store.getters.account;
      },
      widgets(){
        return this.$store.getters.modulesWidgets;
      }
    }
  } 
function greetings(sm, display_name){
  
  sm.interrupt(`Olá, ${display_name}, seja bem vindo.`, 'cheer', sm.DURATION_LONG);

}
</script>


<template>
  <div id="dashboardPage" class="page">
    <section id="widgets" >
      <component v-for='widget in widgets' :is="widget.component" :class='{fullWidth: widget.fulWidth}' class="widget"></component>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  #widgets{
    display: flex;
    width: 90%;
    width: calc(100% - 64px * 2);
    margin: 0 auto;
    padding: 16px;
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;

    .widget{
      $margin: 8px;

      flex: 0 1 100%;
      max-width: 100%;
      margin: $margin;

      &.fullWidth{
        max-width: 100% !important;
        flex-basis: 100% !important; 
      }
      @media screen and (min-width: 678px){
        flex-basis: 20%;        
        flex-basis: calc(25% - 2 * #{$margin});
      }
      @media screen and (min-width: 1200px){
        flex-basis: 40%;
        flex-basis: calc(50% - 2 * #{$margin});
      }
    }

  }

</style>
