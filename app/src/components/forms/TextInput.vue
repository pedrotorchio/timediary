<template id="">
  <div class="input-container text">
    <input class="input" :type="type" :name="name" :placeholder="placeholder" :value="value" @input="changed">
  </div>
</template>
<style lang="scss" scoped>
  @import './styles';
  input{

    border: 0;
    border-bottom: 1px solid $forms__text_lowsat;

    &:focus, &:active, &:hover{
      border-color: $forms__highlight;
    }
  }
</style>
<script>
  export default {
    name: 'TextInput',
    props: ['name', 'value', 'placeholder', 'type'],
    methods:{
      changed(ev){
        this.$emit('input', ev.target.value);
      }
    }
  }
</script>
