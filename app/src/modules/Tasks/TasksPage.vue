<script>
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex';
import tabIcon from './Icon.svg';
import {PageComponent} from 'keepup-modules'; 


export default {
    
    props:['patientId'],
    extends: PageComponent,
    data(){
        return {
            tabIcon
        }
    },
    computed:{
        ...mapGetters({
            patient: 'tasks/currPatient',
        }),
        ...mapState({
            activities: state => state.tasks.activityList,
            category: state => state.tasks.categoryList,
            tasks: state=> state.tasks.currPatientTasks
        })
    },
    methods:{
        ...mapMutations({
            setPatient: 'tasks/setCurrPatientId',            
        }),
        ...mapActions({
            fetchTasks: 'tasks/fetchTasks',
        }),
        taskTimeFormat(timeInMin, task){
            // const timeInMin = task.start;
            const hr = Math.floor(timeInMin/60);
            let min = timeInMin - hr*60;
            
            if(min > 0)
                min = ':' + min;
            else
                min = '';

            return hr + min;
        },
    },
    beforeRouteUpdate (to, from, next) {
        let patientId = to.params.patientId;
        if(patientId){
            this.setPatient(patientId);
            this.fetchTasks(next);
        }
    }
}
</script>

<template>
    <div>
        <h2 id="empty-message" v-if='patient === null'>Selecione um Paciente na lista à esquerda <img id="tabIcon-img" :src="tabIcon" alt=""></h2>
        <section v-else>
            <d3-ganttchart 
            id='task-chart'
            interceptionLabel='Atividades/Horários'
            :tasks="tasks" 
            :endProperty="(task)=>(task.start + task.duration)"
            :displayFormat="taskTimeFormat"
            :colorDomain='[0,7]'
            :colorRange="['#000000', this.themeColor('success')]"
            :colorProperty="(task)=>(task.independency_lvl)"
            ></d3-ganttchart>
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
