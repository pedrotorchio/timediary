import {ModuleElement, Module} from '../../store/Module';
import Registration from './RegistrationSidebar';
import RegistrationIcon from './patient.svg';

import store from './store';

let tab = new ModuleElement({
    icon: {
        template: `<img src='${RegistrationIcon}' class>`
    },
    title: 'Pacientes',
    component: Registration,
    extra:{
        tooltip: 'Gerencie Pacientes'
    }
})
let widget = new ModuleElement({
    icon: '',
    title: 'Pacientes',
    component: {template:'<div> <h1>Número de pacientes cadastradas</h1> <p>27 desde 01/01/2018</p> </div>'}
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

        this.store.registerModule('patients', {
            patientsList: []
        });
        
        let module = new Module({title, routes})
            .addTab(tab)
            .addWidget(widget);
        let uid = module.uid;

        this.store.commit('modules/add', {module, uid});
    }
}