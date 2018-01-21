<script>
// http://local.api.timediary.com.br/account/99/subjects?conditions[]=status:=0
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
      inactiveList: state => state.patients.inactiveList,
      patientsList: state => state.patients.list,
      diagnosticList: state => state.patients.diagnosticList,
      account: state => state.account.info
    }),

    totalCancelationTime(){
      return DELETION_TIMEOUT;
    },
    MAX_EDUCATION_YEARS(){
      return MAX_EDUCATION_YEARS;
    }
  },
  methods: {
    ...mapActions({
      update: 'patients/update',
      deactivate: 'patients/deactivate',
      activate: 'patients/activate',
      status: 'patients/status',
      newDiagnostic: 'patients/createDiagnostic',
      assignDiagnostic: 'patients/assignDiagnostic',
      unassignDiagnostic: 'patients/unassignDiagnostic'
    }),
    extractDiagnosticTitles(diagnostics){
      return diagnostics.map(diagnostic => diagnostic.title);      
    },
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
      this.deactivate(id);
    },
    activatePatient(id) {
      this.activate(id);
    },
    changeDiagnostic(list, patient){
      
      // adição ou remoção?
      
      let inputSize = list.length;
      let listSize  = patient.diagnostics.length;

      let adicao = inputSize > listSize;

      if(adicao){ // adicao      
        
        let title = list[inputSize - 1];
        
        let i = this.diagnosticList.findIndex(diag=>diag.title == title);

        if(i == -1) // é novo
          this.newDiagnostic(title)
              .then(diagnostic =>{
                this.assignDiagnostic({
                  id: patient.id,
                  diagnosticId: diagnostic.id
                })
              });
        else{
          let diagnostic = this.diagnosticList.find(diag => diag.title == title);
          
          this.assignDiagnostic({
            id: patient.id,
            diagnosticId: diagnostic.id
          })
        }

      }else{ // remoçao
        
        let [{title}] = patient.diagnostics.filter(diag => list.indexOf(diag.title) == -1);
        this.removeDiagnostic(title, patient);
      }

    },
    removeDiagnostic(title, patient){
      
      let i = patient.diagnostics.findIndex(diag => diag.title == title);
      
      if(i > -1){
        let diagnostic = patient.diagnostics[i];
        
        this.unassignDiagnostic({
          id: patient.id,
          diagnosticId: diagnostic.id
        });
      }
    }
  },
  created(){
    
    if(this.patientsList.length == 0)
      this.step = 2;
  },
  components: {
    ButtonCancelation
  }

}

</script>
<template src='./registration.htm'>
</template>
<style lang='scss' scoped>

#root /deep/ .fieldset{
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
.s4{
    min-width: 10px;
    flex: 0 1;
    flex-basis: #{100%/4};
    flex-basis: calc(#{100%/4} - 16px);
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
.diagnostic-chip{
  margin: 1px;
  font-size: 10px;
}
</style>
