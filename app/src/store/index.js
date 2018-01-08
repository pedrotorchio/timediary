import Vue from 'vue';
import Vuex, { mapActions } from 'vuex';
import VuexPersist from 'vuex-persist';
import {appName} from '../config';
import router from '../router';

import account from './api/Account';
import modules from './api/Modules';

Vue.use(Vuex);
const persistence = new VuexPersist({
    key: `${appName}-vuex`,
    storage: window.localStorage

});
export default new Vuex.Store({
    modules: {
        account,
        modules
    },
    getters:{
        // dbSidetabs(state, getters){
        //     let modules = getters.modules;
        //     let sidetabs = [];

        //     if(modules === null)
        //         return sidetabs;
            
        //     modules.forEach(module=>{
        //         sidetabs = sidetabs.concat(module.sideTabs);
        //     });

        //     return sidetabs;
        // }

    },
    mutations:{
        
        // addModule(state, module){
        //     if(state.modules === null)
        //         state.modules = [];
        //     let i = state.modules.findIndex(el => el.uid === module.uid);
            
        //     if(i == -1)
        //         state.modules.push(module);
        // }
    },
    plugins: [persistence.plugin]
});