<template>
    <div>
        <h1>{{count}} Pacientes Cadastrados</h1>
    </div>
</template>
<script>
export default {
  computed:{
        count(){
            return this.$store.getters['patients/list'].length;
        }
    }
}
</script>
<style scoped lang='scss'>

</style>
