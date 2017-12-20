<template id="">
  <div class="input-container button">
    <button class="input" :name='name' type="submit" @click='clicked'>{{text}}</button>
  </div>
</template>
<style lang="scss" scoped>
  @import './styles';

  .input{
    box-shadow: 0 6px 20px -10px $forms__text_lowsat;
    margin-bottom: 5px;
    cursor: pointer;
    border: 0;
    &:focus, &:active, &:hover{
      box-shadow: 0 6px 20px -10px $forms__highlight;
      color: $forms__highlight;
    }
  }
</style>
<script>
  export default {
    name: 'ButtonInput',
    props: ['name', 'text'],
    methods:{
      clicked(ev){
        this.$emit('click', ev);
      }
    }
  }
</script>
