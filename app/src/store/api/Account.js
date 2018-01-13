import Router from '../../router';
import ApiService from './ApiService';

let accountService = new ApiService('account');
let authService = new ApiService('auth');

let basicOptions = {};

export default {
    state: {
        loginEmail: null,
        token: null,
        info: null,
        loggedUI: false
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
            return state.info;
        },
        authHeader(state, getters){
            let {token} = getters.loginInfo;
            
            if(!getters.isLogged)
                return {};

            return {
                Authorization: `Bearer ${token}`
            }
        }
    },
    mutations: {
        login(state, {email, token}){
            state.loginEmail = email;
            state.token = token;

            basicOptions.headers = {
                Authorization: `Bearer ${token}`
            };
        },
        setAccount(state, account){
            
            state.info = account;
        },
    },
    actions: {
        login({commit, dispatch}, {email, password}){

            return new Promise((resolve, reject)=>{
                let authorization = btoa(`${email}:${password}`);
            
                authService.get('', {
                    headers: {
                        Authorization: `basic ${authorization}`
                    }
                })
                .then(response=>{
                    commit('login', {email, token:response.token});
                    dispatch('fetchAccountInformation')
                        .then(response=>{
                            commit('setAccount', response);
                            resolve(response);
                        })
                })
                .catch(reject);
            });
        },
        logout({dispatch}){
            dispatch('clear');            
            Router.push({name: 'Login'});
        },
        clear({state}){
            state.loginEmail = null;
            state.token = null;
            state.info = null;
        },
        fetchAccountInformation({getters}){
            return new Promise((resolve,reject)=>{
                let {email} = getters.loginInfo;

                accountService.get(email, basicOptions)
                .then(info=>{
                    resolve(info);
                })
                .catch(reject);
            });
        }
    }    
}