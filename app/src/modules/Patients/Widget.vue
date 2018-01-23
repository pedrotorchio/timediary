<template>
    <div>
        <d3-linechart :domain='[0,100]'
        :lines="[{
            color: 'orange',
            data:[{x:1, y: 24}, {x: 2, y: 43}, {x: 3, y: 68}, {x: 4, y: 89}, {x: 5, y: 94}]
        }]"
        height='200' width='400'/>
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
