<template>
  <div id="loginPage" class="page">
    <form-card id="login-form" @submit='submited'>
      <text-input v-model='emailInput' type='text' placeholder='Email'></text-input>
      <text-input v-model='passwordInput' type='password' placeholder='Senha'></text-input>
      <button-input text='Entrar'></button-input>
    </form-card>
    <div id="providers">

    </div>
  </div>
</template>

<script>
import TextInput from '@/components/forms/TextInput.vue';
import ButtonInput from '@/components/forms/ButtonInput.vue';
import FormCard from '@/components/forms/FormCard.vue';
// import * as firebase from 'firebase';
export default {
  name: 'LoginPage',
  components:{TextInput, ButtonInput, FormCard},
  data () {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },
  methods:{
    submited(){

      let emailPassword = this.validateEmailPassword();
      console.log(emailPassword)
      this.submitEmailPassword();
    },
    validateEmailPassword(){
      return {
        email: 'pedrotorchio@gmail.com',
        password: '1234'
      }
    },
    submitEmailPassowrd(){

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/config';
  #loginPage{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #login-form{
    max-width: $size__phone;
  }

</style>
