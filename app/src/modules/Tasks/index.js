import Vue from 'vue';
import {Element, Module} from 'keepup-modules';
import Installer from '@/plugins/keepup-modules/Installer';
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
        firstClick: true,
        routerPush: {
            name: 'Tasks'
        },
        onClick(){
            this.firstClick = false;
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
            name: 'Tasks',
            path: '/atividades/:patientId?',
            props: true,
            component: TasksPage
        }]
    }
    getTabs(){
        return [tab];
    }
    getDispatches(){
        return [
            'tasks/init',
        ];
    }
}