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

  @import '../../assets/styles/config';

  form{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 32px;
    box-shadow: 0 0 20px -5px $color__grey;
  }

</style>
