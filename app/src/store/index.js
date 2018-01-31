import Vue from 'vue';
import Vuex from 'vuex';

import plugins from './root/plugins';
import getters from './root/getters';
import actions from './root/actions';
import modules from './root/modules';

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
    state:{ /* NAO COLOCAR NADA AQUI, USAR GETTERS */ },
    getters,
    actions,
    plugins
});