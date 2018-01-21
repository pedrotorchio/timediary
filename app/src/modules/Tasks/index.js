import Vue from 'vue';
import {Element, Module, Installer} from 'keepup-modules';
import RegistrationIcon from './tasks.svg';
import Registration from './TasksSidebar';
import TasksPage from './TasksPage';

import store from './store';

let tab = new Element({
    icon: {
        template: `<img src='${RegistrationIcon}' class>`
    },
    title: 'Rotina do ciclo diário dos pacientes',
    component: Registration,
    extra:{
        tooltip: 'Gerencie Atividades',
        routerPush: {
            name: 'Atividades'
        }
    }
});

export default class TasksModule extends Installer{
    getTitle(){
        return 'Atividades';
    }
    getStores(){
        return [store];
    }
    getRoutes(){
        return [{
            name: 'Atividades',
            path: '/atividades',
            component: TasksPage
        }]
    }
    getTabs(){
        return [tab];
    }
    getDispatches(){
        return [
        ];
    }
}