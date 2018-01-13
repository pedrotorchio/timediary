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
    storage: window.localStorage
});
export default new Vuex.Store({
    modules: {
        account,
        modules, 
        ui
    },
    // plugins: [persistence.plugin]
});