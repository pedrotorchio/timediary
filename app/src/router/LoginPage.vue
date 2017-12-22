<script>
// UI
import TextInput from '@/components/forms/TextInput.vue';
import ButtonInput from '@/components/forms/ButtonInput.vue';
import FormCard from '@/components/forms/FormCard.vue';
// Login
import GooglePlusAccount from '@/models/Account/GooglePlusAccount';
// Validators
import EmailValidator from '@/models/validators/EmailValidator';

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
    this.$googleLogin.setSignedInCallback(profile=>{
      new GooglePlusAccount(profile);
    });
    this.$googleLogin.setSignedOutCallback(()=>{

    });
    this.$googleLogin.onError(err=>{

    });
  },
  methods:{
    passwordSignIn(){

      let email = EmailValidator(this.emailInput);
      let passw = PasswordValidator(this.passwordInput);


      // let auth = new CredentialsAuthMethod(email, password);
      //     auth.submit()
      //         .then(account=>{
      //           console.dir(account);
      //         });
    },
    googleSignIn(){
      this.$googleLogin.login();
    }
  },

}
</script>


<template>
  <div id="loginPage" class="page">
    <div id="content">
      <form-card id="login-form" @submit='passwordSignIn'>
        <text-input v-model='emailInput' type='text' placeholder='Email'></text-input>
        <text-input v-model='passwordInput' type='password' placeholder='Senha'></text-input>
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
