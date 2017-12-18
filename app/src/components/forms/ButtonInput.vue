<template id="">
  <div class="input button">
    <input :name='name' type="submit" @click='clicked' :value='text'>
  </div>
</template>
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
    box-shadow: 0 6px 20px -10px $color__grey;
    transition: {
      property: border-color, box-shadow;
      duration: $time__transition;
    }
    cursor: pointer;

    &:focus, &:active, &:hover{
      border-color: $color__highlight_details;

    }

  }

</style>
