import ApiService from '../api/ApiService';
import {ModuleElement} from '../Module';

import AccountConfig from './configComponents/Account.vue';

let accountService = new ApiService('account');

const nativeConfigTabs = [
    new ModuleElement({
        icon: {
            template: 
            `<v-badge color='orange' left>
                <span slot="badge">!</span>
                <v-icon>account_circle</v-icon>
            </v-badge>`
        },
        title: 'Usuário',
        component: AccountConfig,
        extra:{
            tooltip: 'Atualize suas informações pessoais'
        }
    })
];
export default {
    namespaced: true,
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
        clear({commit}){
            commit('uiLogged', false);
        },
        modulesLoad({getters, commit}){

        }
    }    
}