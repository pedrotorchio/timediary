<script>

export default {

  name: 'DashboardPage',
  components:{},

  mounted(){
    function logout(){
      this.$store.commit('logout');      
    }
    
    let email = this.$store.getters.account.login_email;
    this.$timeDiary.getModules(email);
    this.$timeDiary.api().getAccountInformation(email)
        .then(details=>{
          
          this.$store.commit('account', details);
          
          greetings(this.$sysMsg, details.pers_display_name);
          
        })
        // .catch(logout.bind(this));
  },
    computed:{
    tabs(){
      return this.$store.getters.dbSidetabs;
    }
  }
}
function greetings(sm, display_name){
  
  sm.interrupt(`Olá, ${display_name}, seja bem vindo.`, 'cheer', sm.DURATION_LONG);

}
</script>


<template>
  <div id="dashboardPage" class="page">
    <div id="widgets">
      
    </div>
    <aside id="tabs">
      <ul>
        <li v-for="tab in tabs">{{tab.title}}</li>
      </ul>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
