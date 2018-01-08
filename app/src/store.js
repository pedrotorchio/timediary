import Vue from 'vue';
import Vuex, { mapActions } from 'vuex';
import VuexPersist from 'vuex-persist';
import {appName} from './config';
import router from './router';

Vue.use(Vuex);
const persistence = new VuexPersist({
    key: `${appName}-vuex`,
    storage: window.localStorage

});
const INITIAL_STORE = {
    account: null,
    token: null,
    modules: []
};
export default new Vuex.Store({
    state: {
        account: null,
        token: null,
        modules: []
    },
    getters:{
        token(state){
            return state.token;
        },
        isLogged(state, getters){
            return getters.token != null && state.account != null && state.account.login_email != false;
        },
        account(state, getters){
            if(getters.isLogged)
                return state.account;
            else
                return null;
        },
        modules(state){
            return state.modules;
        },
        loginInfo(state, getters){
            if(getters.isLogged)
                return {
                    email: getters.account.login_email,
                    token: getters.token
                };
            else
                return null;
        },
        dbSidetabs(state, getters){
            let modules = getters.modules;
            let sidetabs = [];

            if(modules === null)
                return sidetabs;
            
            modules.forEach(module=>{
                sidetabs = sidetabs.concat(module.sideTabs);
            });

            return sidetabs;
        }

    },
    mutations:{
        logout(state){
            for(let prop in state)
                if(state.hasOwnProperty(prop)){
                    state[prop] = INITIAL_STORE[prop];
                }

            router.push({
                name: 'Login'
            });
        },
        addModule(state, module){
            if(state.modules === null)
                state.modules = [];
            let i = state.modules.findIndex(el => el.uid === module.uid);
            
            if(i == -1)
                state.modules.push(module);
        },
        login(state, emailToken){            
            state.account = {
                login_email: emailToken.email
            };
            state.token = emailToken.token;
        },
        account(state, details){
            state.account = {...state.account, ...details};
        }
    },
    plugins: [persistence.plugin]
});