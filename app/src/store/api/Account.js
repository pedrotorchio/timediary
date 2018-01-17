import Router from '../../router';
import ApiService from './ApiService';
import axios from 'axios';


export default {
    namespaced: true,
    state: {
        loginEmail: null,
        token: null,
        info: null
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
        },
        id(state, getters){
            let id = getters.account
            if(id != null)
                id = id.id;
            
            return id;
        },
        email(state, getters){
            let email = getters.account;
            if(email != null)
                email = email.email;

            return email;
        },
        root(state, getters){
            let root = getters.account;
            if(root != null)
                root = root.root;

            return root;
        }
    },
    mutations: {
        login(state, {email, token}){
            
            state.loginEmail = email;
            state.token = token;
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        setAccount(state, account){
            
            state.info = account;
        },
    },
    actions: {
        login({commit, dispatch}, {email, password}){
            
            return new Promise((resolve, reject)=>{
                let authorization = btoa(`${email}:${password}`);
                axios.get('/auth', {
                    headers: {
                        Authorization: `basic ${authorization}`
                    }
                })
                .then(response=>{
                    
                    let login = {email, token:response.data.token};
                    commit('login', login);
                    resolve(login);
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
        fetchAccountInformation({getters, commit}){
            let {email} = getters.loginInfo;

            return new Promise((resolve, reject)=>{
                axios.get(`account/${email}`).then(({data}) => resolve(data)).catch(reject);
            });
                
        },
        sendAccountInformation({state, getters}, info){
            
            return axios.put(`account/${info.id}`, info);
        }
    }    
}