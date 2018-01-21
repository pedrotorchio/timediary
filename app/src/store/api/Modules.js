import Router from '../../router';


import Patients from '../../modules/Patients';
import Tasks from '../../modules/Tasks';

const nativeModules = [
    Patients,
    Tasks
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
        add(state, module){
            module.sidetabs.forEach(tab=>{
                state.sidetabs.push(tab);
            });
            module.widgets.forEach(widget=>{
                state.widgets.push(widget);
            });
            state.list[module.uid] = module;
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
        load({getters, commit}){
            if(getters.isDoneLoading)
                return;
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