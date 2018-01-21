import Vue from 'vue';
import {Element, Module, Installer} from 'keepup-modules';
import Registration from './RegistrationSidebar';
import RegistrationIcon from './patient.svg';
import Widget from './Widget';

import store from './store';

let tab = new Element({
    icon: {
        template: `<img src='${RegistrationIcon}' class>`
    },
    title: 'Pacientes',
    component: Registration,
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