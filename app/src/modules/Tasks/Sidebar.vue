<script>
import {mapState, mapGetters} from 'vuex';
import TabIcon from './Icon.svg';

export default {
  data(){
    return {
     
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
     
    }
  }
}
</script>
<template src='./sidebar.htm'>
</template>
<style>

</style>
