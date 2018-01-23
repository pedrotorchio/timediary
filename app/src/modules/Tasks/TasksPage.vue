<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
import tabIcon from './Icon.svg';
export default {
    props:{
        patientId: {
        }
    },
    computed:{
        ...mapGetters({
            patient: 'tasks/currPatient'
        }),
        tabIcon(){
            return tabIcon;
        }
    },
    methods:{
        ...mapMutations({
            setPatient: 'tasks/setCurrPatientId'
        })
    },
    beforeRouteUpdate (to, from, next) {
        let id = to.params.patientId;
        if(id)
            this.setPatient(id);
        next();
    },
    created(){
        
        if(this.patientId)
            this.setPatient(this.patientId);
    }
}
</script>

<template>
    <div>
        <h2 id="empty-message" v-if='!patient'>Selecione um Paciente na lista à esquerda <img id="tabIcon-img" :src="tabIcon" alt=""></h2>
        <section v-else>
            
        </section>
    </div>
</template>
<style lang='scss' scoped>
#empty-message{
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
}
#tabIcon-img{
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 4px;
    margin: 4px;
    width: auto;
    height: 50px;
}
</style>
