import Router from '../../router';
import ApiService from './ApiService';

let accountService = new ApiService('account');
let authService = new ApiService('auth');

export default {
    state: {
        loginEmail: null,
        token: null,
        account: null
    },
    getters: {
        loginInfo(state){
            return {
                email: state.loginEmail,
                token: state.token
            }
        },
        isLogged(state, getters){
            let info = getters.loginInfo;
            return info.token != null && info.email != null;
        },
        account(state, getters){
            return state.account;
        }
    },
    mutations: {
        login(state, {email, token}){
            state.loginEmail = email;
            state.token = token;
        }
    },
    actions: {
        login({commit}, {email, password}){

            return new Promise((resolve, reject)=>{
                let authorization = btoa(`${email}:${password}`);
            
                authService.get('', {
                    headers: {
                        Authorization: `basic ${authorization}`
                    }
                })
                .then(response=>{
                    commit('login', {email, token:response.token});
                    resolve();
                })
                .catch(reject);
            });
        },
        logout({state, commit}){
            commit('clear');            
            Router.push({name: 'Login'});
        },
        clear({state}){
            state.loginEmail = null;
            state.token = null;
            state.account = null;
        }
    }    
}