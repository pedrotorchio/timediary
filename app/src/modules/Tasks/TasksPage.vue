<script>
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex';
import tabIcon from './Icon.svg';
import {PageComponent} from 'keepup-modules'; 
import NewTaskDialog from './components/NewTaskDialog';

export default {
    components:{NewTaskDialog},
    props:['patientId'],
    extends: PageComponent,
    data(){
        return {
            tabIcon,
            taskDialog:{
                styles: {
                    left: 0,
                    top: 0
                },
                data: {
                    title: '',
                    start: 360,
                    company: '',
                    location: '',
                    duration: 0,
                    independency_lvl: 1,
                    category: '',
                    shown: false            
                },
            }
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
        newTaskDialog({title, start, x, y}){
            if(this.taskDialog.data.shown){
                this.hideTaskDialog();
                setTimeout(()=>this.showTaskDialog({title, start, x, y}), 200);
            }else
                this.showTaskDialog({title, start, x, y});
        },
        showTaskDialog({title, start, x, y}){
            this.taskDialog.data.title = title;
            this.taskDialog.data.start = start;

            this.taskDialog.styles.left = `${++x}px`;
            this.taskDialog.styles.top = `${++y}px`;

            this.taskDialog.data.shown = true;
        },
        hideTaskDialog(){
            this.taskDialog.data.shown = false;
        }
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
    <div @click='hideTaskDialog'>
        <h2 id="empty-message" v-if='patient === null'>Selecione um Paciente na lista à esquerda <img id="tabIcon-img" :src="tabIcon" alt=""></h2>
        <section v-else>
            <d3-ganttchart 
            id='task-chart'
            interceptionLabel='Atividades/Horários'
            :tasks="tasks" 
            :endProperty="(task)=>(task.start + task.duration)"
            :displayFormat="taskTimeFormat"
            :colorDomain='[0,7]'
            :colorRange="[this.themeColor('error'), this.themeColor('accent')]"
            :colorProperty="(task)=>(task.independency_lvl)"

            @columnClick='newTaskDialog({
                title: $event.taskTitle,
                start: $event.start,
                x: $event.event.clientX,
                y: $event.event.clientY
            })'
            ></d3-ganttchart>
        </section>
        <new-task-dialog v-model="taskDialog.data" :style="taskDialog.styles"></new-task-dialog>
    </div>
</template>
<style lang='scss' scoped>
.newtaskdialog{
    position: absolute;
}
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
