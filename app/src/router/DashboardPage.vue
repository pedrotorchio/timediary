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
          this.$store.commit('accountDetails', response.data);
        })
    setTimeout(()=>{greetings(this.$sysMsg);}, 1000);
  },
  methods:{
    
  },

}
function greetings(sm){
  
  sm.interrupt('Olá, pedrotorchio, seja bem vindo.', 'cheer', sm.DURATION_LONG);

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
