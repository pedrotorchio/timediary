<script>
export default {

  data(){
    return {
      step: 1,
      date: null,
      dateFormatted: null,
      modal: false
    }
  },
  methods:{
    blurDetected(event){
      console.log(event);
    },
    formatDate (date) {
        if (!date) {
          return null;
        }

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      },
    parseDate (date) {
      if (!date) {
        return null;
      }

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  },
  computed:{
    account(){
      return this.$store.getters.account;
    }
  }
  
}
</script>

<template src='./account-config.htm'>
</template>

<style lang='scss' scoped>
.fieldset{
  display: flex;
}
</style>
