<script>
import {mapState} from 'vuex';
export default {
  data(){
      return {
          step: 1
      }
  },
  computed:{
      ...mapState({
          patientsList: state => state.patients.list
      })
  }
}
</script>
<template src='./registration.htm'>
</template>
<style>

</style>
