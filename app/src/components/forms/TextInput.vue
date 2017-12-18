<template id="">
  <div class="input text">
    <input :type="type" :name="name" :placeholder="placeholder" :value="value" @input="changed">
  </div>
</template>
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
<style lang="scss" scoped>
  @import '../../../node_modules/media-query-mixins/mixins';
  @import '../../assets/styles/config';

  $height: 2em;
  $font: 32px;

  div{
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    height: $height;
    line-height: $height;
    font-size: $font;
    box-sizing: border-box;
  }

  input{
    box-sizing: border-box;
    width: 100%;
    height: $height;
    line-height: inherit;
    font-size: $font;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    border-bottom: 1px solid $color__grey;

    transition: border-color $time__transition;

    &:focus, &:active{
      border-color: $color__highlight_details;
    }
  }

</style>
