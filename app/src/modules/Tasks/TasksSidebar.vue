<script>
import {mapState, mapMutations} from 'vuex';
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
  },
  methods:{
    ...mapMutations({
        setPatient: 'tasks/setCurrentPatient',
    })
  }
}
</script>
<template src='./sidebar.htm'>
</template>
<style>

</style>
