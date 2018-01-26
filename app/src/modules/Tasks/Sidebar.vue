<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import TabIcon from './Icon.svg';

export default {
  data(){
    return {
     
    }
  },
  computed: {
    ...mapState({
      patientsList: state => state.patients.list,
      currPatientId: state => state.tasks.currPatientId,
    }),
    ...mapGetters({
      currPatient: 'tasks/currPatient',
    })
  },
  methods:{
    choosePatient(patientId){
      
    }
  }
}
</script>
<template src='./sidebar.htm'>
</template>
<style>

</style>
