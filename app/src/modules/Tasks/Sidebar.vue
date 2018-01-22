<script>
import {mapState, mapGetters} from 'vuex';
import TabIcon from './Icon.svg';

export default {
  data(){
    return {
      step: 1
    }
  },
  computed: {
    ...mapState({
      patientsList: state => state.patients.list
    }),
    ...mapGetters({
      patient: 'tasks/currPatient'
    })
  },
  methods:{
    choosePatient(patientId){
      this.step = 2;
    }
  }
}
</script>
<template src='./sidebar.htm'>
</template>
<style>

</style>
