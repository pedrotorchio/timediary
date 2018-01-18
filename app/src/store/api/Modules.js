import Router from '../../router';

import Tasks from '../../modules/Tasks';
import Patients from '../../modules/Patients';

const nativeModules = [
    Tasks, Patients
]
export default {
    namespaced: true,
    state: {
        list: {},
        doneLoading: false,
        sidetabs: [],
        widgets: []
    },
    getters: {
        list(state){
            return state.list;
        },
        isDoneLoading(state){
            return state.doneLoading;
        },
        sidetabs(state){
            return state.sidetabs;
        },
        widgets(state){
            return state.widgets;
        }
    },
    mutations: {
        add(state, {uid, module}){
            
            module.sidetabs.forEach(tab=>{
                state.sidetabs.push(tab);
            });
            module.widgets.forEach(widget=>{
                state.widgets.push(widget);
            });
            state.list[uid] = module;
        },
        doneLoading(state){
            state.doneLoading = true;
        }
    },
    actions: {
        clear({state, dispatch}){
            
            for(module in state.list)
                if(state.list.hasOwnProperty(module))
                    delete state.list[module];
            state.sidetabs.length = 0;
            state.widgets.length = 0;
            state.doneLoading = false;
        },
        load({commit}){
            
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

                commit('doneLoading');
                
            });

        }
    }    
}