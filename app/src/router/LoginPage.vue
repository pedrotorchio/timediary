<template>
  <div id="loginPage" class="page">
    <div id="content">
      <form-card id="login-form" @submit='submited'>
        <text-input v-model='emailInput' type='text' placeholder='Email'></text-input>
        <text-input v-model='passwordInput' type='password' placeholder='Senha'></text-input>
        <button-input text='Entrar/Cadastrar'></button-input>
      </form-card>
      <div id="providers">
        <div
          class = 'provider'
          @click="googleSignIn">
          Entrar com Google
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../assets/styles/config';
  #loginPage{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
  #content{
    font-size: inherit;
    width: 100%;
    max-width: $size__phone;
  }
  #providers{
    $height: 2em;
    height: $height;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-items: center;

    .provider{
      $pad: .5em;
      height: $height;
      line-height: $height - 2*$pad;
      flex-grow: 0;
      padding: $pad;
      cursor: pointer;
      transition: color .2s;
      &:hover{
        color: $color__highlight;
      }
    }
  }
</style>
<script>
import TextInput from '@/components/forms/TextInput.vue';
import ButtonInput from '@/components/forms/ButtonInput.vue';
import FormCard from '@/components/forms/FormCard.vue';
import CredentialsAuthMethod from '@/controllers/auth/CredentialsAuthMethod';
import GoogleAuthMethod from '@/controllers/auth/GoogleAuthMethod';

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
      console.log(this.$TDAPI.postAccounts());
      let emailPassword = this.validateEmailPassword();

      this.submitEmailPassword(emailPassword.email, emailPassword.password);
    },
    validateEmailPassword(){
      let email = this.emailInput;
      let password = this.passwordInput;
      return {
        email,
        password
      }
    },
    submitEmailPassword(email, password){
      let auth = new CredentialsAuthMethod(email, password);
          auth.submit()
              .then(account=>{
                console.dir(account);
              });
    },
    googleSignIn(){
      new GoogleAuthMethod()
          .submit()
            .then(account=>console.dir(account))
            .catch(error=>console.log(error));
    }
  }
}
</script>
