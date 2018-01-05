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
  name: 'LoginPage',
  components:{TextInput, ButtonInput, FormCard},
  data () {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },
  mounted(){
    this.$sysMsg.whenReady(()=>setTimeout(()=>{
      
      greetings(this.$sysMsg);
    }, 1000));
    this.$googleLogin.setSignedInCallback(profile=>{
      new GooglePlusAccount(profile);
    });
    this.$googleLogin.setSignedOutCallback(()=>{

    });
    this.$googleLogin.onError(err=>{

    });
    this.$TDAPI.onError(error=>{
      
      console.dir(error);

      this.$sysMsg.interrupt(error.message, 'error');
      
    })
  },
  methods:{
    passwordSignIn(){

      let email = EmailValidator(this.emailInput);
      let passw = PasswordValidator(this.passwordInput);

      this.$TDAPI.login(email, passw)
          .then(response=>{
            console.dir(response);
          });
    },
    googleSignIn(){
      this.$googleLogin.login();
    }
  },

}
function greetings(sm){
  
  sm.push('Olá, seja bem vindo ao Time Diary', 'cheer');
  sm.push('Entre usando um email Google', 'cheer');
  sm.push('... ou escolha um email e senha para começar a usar.', 'cheer', sm.DURATION_STAY);

}
</script>


<template>
  <div id="loginPage" class="page">
    <div id="content">
      <form-card id="login-form" @submit='passwordSignIn'>
        <text-input name='login_email' v-model='emailInput' type='email' placeholder='Email'></text-input>
        <text-input name='login_password' v-model='passwordInput' type='password' placeholder='Senha'></text-input>
        <button-input text='Entrar/Cadastrar'></button-input>
      </form-card>
      <div id="providers">
        <div
          class = 'google provider'
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
    $pad: .5px;

    height: $height;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-items: center;

    .provider{
      overflow: hidden;
      max-height: 0;
      height: $height;
      line-height: $height;
      flex-grow: 0;
      padding: $pad;
      cursor: pointer;
      transition: {
        property: color, max-height;
        duration: .2s;
      }
      &:hover{
        color: $color__highlight;
      }
    }
  }
  .gapi-loaded .google.provider{
    max-height:100px !important;
  }
</style>
