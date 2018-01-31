import Vue from 'vue';
import {Element, Module, Installer} from 'keepup-modules';
import Sidebar from './Sidebar';
import Icon from './Icon.svg';
import Widget from './Widget';

import store from './Store';

let tab = new Element({
    icon: {
        template: `<img src='${Icon}' class>`
    },
    title: 'Pacientes',
    component: Sidebar,
    extra:{
        tooltip: 'Gerencie Pacientes'
    }
})
let widget = new Element({
    icon: '',
    title: 'Pacientes',
    component: Widget
});


export default class PatientsModule extends Installer{
    constructor(){
        super();
    }
    getTitle(){
        return 'Pacientes';
    }
    getStores(){
        return [store];
    }
    getTabs(){
        return [tab];
    }
    getWidgets(){
        return [widget];
    }
    getDispatches(){
        return [
            'patients/loadList',
            'patients/loadInactive',
            'patients/loadDiagnostics'
        ];
    }
}