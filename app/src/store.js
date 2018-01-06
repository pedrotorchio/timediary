import Vue from 'vue';
import Vuex, { mapActions } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        account: null,
        token: null
    },
    getters:{
        token(state){
            return state.token;
        },
        isLogged(state, getters){
            return getters.token != null;
        },
        account(state, getters){
            if(getters.isLogged)
                return state.account;
            else
                return null;
        },
        loginInfo(state, getters){
            if(getters.isLogged)
                return {
                    email: getters.account.login_email,
                    token: getters.token
                };
            else
                return null;
        }
    },
    mutations:{
        login(state, email, token){
            state.account = {
                login_email: email
            }
            state.token = token;
        },
        account(state, details){
            state.account = {...state.account, ...details};
        }
    }
});