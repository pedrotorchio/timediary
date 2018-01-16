import {ModuleElement, Module} from '../../store/Module';

let tab = new ModuleElement({
    icon: {
        template: '<v-icon>fa-tasks</v-icon>'
    },
    title: 'Atividades',
    component: {template:'<div>Atividade tab</div>'}
});

const title = 'Atividades';
const routes = [];


export default class TasksModule{
    constructor(){
        
        this.install();
    }
    install(){
        this.app = window.DIARY;
        this.store = this.app.$store;
        this.router = this.app.$router;
        
        let module = new Module({title, routes})
            .addTab(tab);
        let uid = module.uid;

        this.store.commit('modules/add', {module, uid});
    }
}