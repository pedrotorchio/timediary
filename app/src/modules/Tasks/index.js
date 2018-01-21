import Vue from 'vue';
import {Element, Module, Installer} from 'keepup-modules';
import Icon from './Icon.svg';
import Sidebar from './Sidebar';
import Store from './Store';

import TasksPage from './TasksPage';


let tab = new Element({
    icon: {
        template: `<img src='${Icon}' class>`
    },
    title: 'Rotina do ciclo diário dos pacientes',
    component: Sidebar,
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
        return [Store];
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