import Vue from 'vue';
import Vuex, { mapActions } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        account: null
    },
    getters:{
        isLogged(state, getters){
            return state.account !== null && state.account.token != undefined;
        },
        accountToken(state, getters){
            if(getters.isLogged)
                return state.account.token;
            else
                return null;
        },
        account(state){
            return state.account;
        }
    },
    mutations:{
        login(state, tokenEmail){
            state.account = tokenEmail;
        },
        accountDetails(state, details){
            
            state.account = {...state.account, ...details};
        }
    }
});