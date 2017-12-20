<template id="">
  <form @submit.prevent='submited'>
    <slot></slot>
  </form>
</template>
<script>
  export default {
    name: 'FormCard',
    methods:{
      submited(){
        this.$emit('submit');
      }
    }
  }
</script>
<style lang="scss" scoped>

  @import './styles';

  form{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: .5em;
    box-shadow: 0 0 20px -5px $forms__text_lowsat;
    font-size: inherit;
  }


</style>
