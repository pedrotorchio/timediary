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
    alterarCredenciais(){
      this.$sysMsg.interrupt('Verifique seu email');
    },
    focusDetected(event){
      currentFieldValue = event.target.value;
    },
    changeDetected($value, patient, field) {
      let model = {};
      model['id'] = patient.id;
      model[field] = $value;

      this.$store.dispatch('account/sendAccountInformation', model);
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
      return this.$store.state.account.info;
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
button.button{
    background-color: #326786;
    padding: 16px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.149);
    margin-bottom: 5px;
}
</style>
