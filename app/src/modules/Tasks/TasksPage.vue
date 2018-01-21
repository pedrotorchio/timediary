<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState({
            patient: state => state.tasks.openPatient,
        }),
    }
}
</script>

<template>
    <div>
        <h2 v-if='!patient'>Selecione um Paciente na lista à esquerda</h2>
        <section v-else>
            {{patient}}
        </section>
    </div>
</template>
<style>

</style>
