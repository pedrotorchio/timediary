<script>
import {mapState} from 'vuex';
const MAX_EDUCATION_YEARS = 25;

const resetPatient = function(){
    return {
        pers_first_name: null,
        pers_last_name: null,
        pers_phone: null,
        pers_occupation: null,
        pers_birth: null,
        pers_email: null,
        pers_picture_url: null,
        pers_phone: null,
        pers_gender: null,
        pers_language: null,
        education_years: null
    }
}
export default {
  data(){
      return {
        step: 1,
        modal: false,
        dateFormatted: null,
        newPatient: resetPatient()
      }
  },
  computed:{
      ...mapState({
          patientsList: state => state.patients.list,
          account: state => state.account.info
      }),
      educationProgress(){
          return Math.min(100, this.newPatient.education_years * 100/MAX_EDUCATION_YEARS);
      }
  },
  methods:{
      focusDetected(){

      },
      blurDetected(){

      },
      submit2(){
          this.$store.dispatch('patients/create', this.newPatient);
          this.newPatient = resetPatient();
      }
  }
}
</script>
<template src='./registration.htm'>
</template>
<style lang='scss'>
@import '../../assets/styles/config';

.fieldset{
    display: flex;
    &> .input{
        margin: 0 8px;
    }
}
.s3{
    min-width: 150px;
    flex: 0 1;
    flex-basis: #{100%/3};
    flex-basis: calc(#{100%/3} - 16px);
}
button.btn{
    color: $color__base !important;
}
</style>
