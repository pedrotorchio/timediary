<script>

export default {
  name: 'DashboardPage',
  components:{},
  data () {
    return {
      
    }
  },
  mounted(){
    this.$TDAPI.getAccountInformation(this.$store.getters.account.email)
        .then(response=>{
          let details = response.data;
          this.$store.commit('account', details);

          greetings(this.$sysMsg, details.pers_display_name);
          
        })
  },
  methods:{
    
  },

}
function greetings(sm, display_name){
  
  sm.interrupt(`Olá, ${display_name}, seja bem vindo.`, 'cheer', sm.DURATION_LONG);

}
</script>


<template>
  <div id="dashboardPage" class="page">
    <div id="content">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
