import Patients from '@/modules/Patients';
import Tasks from '@/modules/Tasks';
import {stateFactory} from './state';

const nativeModules = [
    Patients,
    Tasks
];
export default {
    clear({state}){
        for(let moduleId in state.list){
            if(state.list.hasOwnProperty(moduleId)){
                 const  module = state.list[moduleId]
                        module.uninstaller.run();
            }
        }
        stateFactory(state);
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