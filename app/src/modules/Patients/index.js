import Vue from 'vue';
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
    component: {
        template:'<h1>{{count}} Pacientes Cadastrados</h1>',
        computed:{
            count(){
                return this.$store.getters['patients/list'].length;
            }
        }
    }
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

        this.store.registerModule('patients', store);
          
        let module = new Module({title, routes})
            .addTab(tab)
            .addWidget(widget);
        let uid = module.uid;

        this.store.commit('modules/add', {module, uid});
        this.store.dispatch('patients/loadList');
        this.store.dispatch('patients/loadInactive');
        this.store.dispatch('patients/loadDiagnostics');
    }
}