<script>
import ButtonCancelation from '@/components/forms/ButtonWithCancelation';
import {DELETION_TIMEOUT} from '../../config';
import {
  mapActions,
  mapState
} from 'vuex';
const MAX_EDUCATION_YEARS = 25;

let fieldValue = null;
const resetPatient = function () {
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
  data() {
    return {
      step: 1,
      modal: false,
      dateFormatted: null,
      newPatient: resetPatient()
    }
  },
  computed: {
    ...mapState({
      patientsList: state => state.patients.list,
      account: state => state.account.info
    }),
    totalCancelationTime(){
      return DELETION_TIMEOUT;
    }
  },
  methods: {
    ...mapActions({
      update: 'patients/update',
      status: 'patients/status'
    }),
    educationProgress(years) {
      return Math.min(100, years * 100 / MAX_EDUCATION_YEARS);
    },
    changeDetected($value, patient, field) {
      let model = {};
      model['id'] = patient.id;
      model[field] = $value;

      this.update(model);
    },
    submit2() {
      this.$emit('loading', true);
      this.$store.dispatch('patients/create', this.newPatient)
        .then((patient) => {
          this.$emit('loading', false);
          this.step = 1;
          this.newPatient = resetPatient();
        });

    },
    deletePatient(id) {
      this.update({
        id,
        status: 0
      });
    }
  },
  components: {
    ButtonCancelation
  }
}

</script>
<template src='./registration.htm'>
</template>
<style lang='scss'>

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
.btn-submit{
    margin: 0 auto !important;
    overflow: hidden;
    position: relative;
    transition-property: bottom, box-shadow, background-color;
    transition-duration: .5s;
    &.active{
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        bottom: 8px;
    }
    bottom: 0;
    display: flex;
    font-weight: bold;
}
.deletion-progress{
    margin: 0;
}
.stepper-header{
  .stepper__step--active{
    background-color: rgba(0,0,0,.1);
  }
}
</style>
