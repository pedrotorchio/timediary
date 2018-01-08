import Router from '../../router';
import ApiService from './ApiService';

let accountService = new ApiService('account');
let authService = new ApiService('auth');

export default {
    state: {
        modules: [],
        doneLoading: false
    },
    getters: {
        modules(state){
            return state.modules;
        },
        isDoneLoading(state){
            return state.doneLoading;
        }
    },
    mutations: {
        addModule(state, module){
            state.modules.push(module);
        }
    },
    actions: {
        clearModules(state){
            state.modules.length = 0;
        },
        clear(state){
            state.loginEmail = null;
            state.token = null;
            state.account = null;
        },
        modulesLoad({rootGetters}){
            let email = rootGetters.loginInfo.email;

            return new Promise((resolve, reject)=>{
                accountService.get(`${email}?relationships=modules`)
                .then(response=>{
                    let modules = response.data;
                    console.dir(modules);
                })
                .catch((error)=>{
                    reject({
                        message: 'Impossível carregar Módulos'
                    });
                });
            });
            
        }
    }    
}