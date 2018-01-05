<script>
// UI
import TextInput from '@/components/forms/TextInput.vue';
import ButtonInput from '@/components/forms/ButtonInput.vue';
import FormCard from '@/components/forms/FormCard.vue';
// Login
import GooglePlusAccount from '@/models/Account/GooglePlusAccount';
// Validators
import EmailValidator from '@/models/validators/EmailValidator';
import PasswordValidator from '@/models/validators/PasswordValidator';

export default {
  name: 'DashboardPage',
  components:{},
  data () {
    return {
      
    }
  },
  mounted(){
    setTimeout(()=>{greetings(this.$sysMsg);}, 1000);
  },
  methods:{
    
  },

}
function greetings(sm){
  
  sm.push('Olá, pedrotorchio, seja bem vindo.', 'cheer');

}
</script>


<template>
  <div id="loginPage" class="page">
    <div id="content">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
