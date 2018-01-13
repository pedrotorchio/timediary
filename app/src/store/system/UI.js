import ApiService from '../api/ApiService';
import {ModuleElement} from '../Module';

let accountService = new ApiService('account');

const nativeConfigTabs = [
    new ModuleElement({
        icon: {
            template: `<v-badge color='orange' left>
                <span slot="badge">!</span>
                <v-icon>settings</v-icon>
            </v-badge>`
        },
        title: 'Usuário',
        component: {template: '<div>Testando</div>'}
    })    
];
export default {
    state: {
        configTabs: nativeConfigTabs,
        uiLogged: false
    },
    getters: {
        configTabs(state){
            return state.configTabs;
        },
        uiLogged(state){
            return state.uiLogged;
        }
    },
    mutations: {
        uiLogged(state, value){
            state.uiLogged = value;
        },

    },
    actions: {
        modulesClear({state}){
            
        },
        clear({state, dispatch}){
            
        },
        modulesLoad({getters, commit}){

        }
    }    
}