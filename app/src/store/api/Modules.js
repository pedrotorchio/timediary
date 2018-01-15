import Router from '../../router';
import ApiService from './ApiService';

let accountService = new ApiService('account');

import Tasks from '../../modules/Tasks';
import Patients from '../../modules/Patients';

const nativeModules = [
    Tasks, Patients
]
export default {
    state: {
        modulesList: {},
        modulesDoneLoading: false,
        modulesSidetabs: [],
        modulesWidgets: []
    },
    getters: {
        modulesList(state){
            return state.list;
        },
        modulesIsDoneLoading(state){
            return state.doneLoading;
        },
        modulesSidetabs(state){
            return state.modulesSidetabs;
        },
        modulesWidgets(state){
            return state.modulesWidgets;
        }
    },
    mutations: {
        modulesAdd(state, {uid, module}){
            
            module.sidetabs.forEach(tab=>{
                state.modulesSidetabs.push(tab);
            });
            module.widgets.forEach(widget=>{
                state.modulesWidgets.push(widget);
            });
            state.modulesList[uid] = module;
        },
        modulesDoneLoading(state){
            state.modulesDoneLoading = true;
        }
    },
    actions: {
        modulesClear({state}){
            for(module in state.modulesList)
                if(state.modulesList.hasOwnProperty(module))
                    delete state.modulesList[module];
            state.modulesSidetabs.length = 0;
            state.modulesWidgets.length = 0;
            state.modulesDoneLoading = false;
        },
        clear({state, dispatch}){
            dispatch('modulesClear');
        },
        modulesLoad({commit}){
            
            // install native async
            setTimeout(()=>{
                nativeModules.forEach(className=>{
                    let module = new className();
                });

                // fetch remote modules
                // get [{url, title, icon, uid}] = modules
                // then modules => each module modulesAdd(new Module(module))
                // --> Module constructor => if url then Module.loadScript(url)
                // --> loaded script => store.getters.modulesList[uid] = new Module();
            });

            commit('modulesDoneLoading');
        }
    }    
}