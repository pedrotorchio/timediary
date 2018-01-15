import Vue from 'vue';
import Vuex, { mapActions } from 'vuex';
import VuexPersist from 'vuex-persist';
import {appName} from '../config';
import router from '../router';
0
import account from './api/Account';
import modules from './api/Modules';
import ui from './system/UI';

Vue.use(Vuex);
const persistence = new VuexPersist({
    key: `${appName}-vuex`,
    storage: window.localStorage,
    reducer(state) {
        return{
            account:{
                token: state.account.token,
                loginEmail: state.account.loginEmail
            }
        }
    }
});

export default new Vuex.Store({
    modules: {
        account,
        modules, 
        ui
    },
    getters:{
        namespaces(state){
            let nsList = [];
            for(module in state){
                if(state.hasOwnProperty(module))
                    nsList.push(module);
            }

            return nsList;
        }
    },
    actions:{
        clear({getters, dispatch}){
            getters.namespaces.forEach(module=>{
                
                dispatch(`${module}/clear`);
            });
        }
    },
    plugins: [persistence.plugin]
});