import Router from '@/router';
import axios from 'axios';
import {stateFactory} from './state';
export default {
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
                axios.defaults.headers.common['Authorization'] = `Bearer ${login.token}`;

                commit('login', login);
                resolve();
            });
        });
    },
    logout({dispatch}){
        dispatch('clear', null, {root: true});
        Router.push({name: 'Login'});
    },
    clear({state}){
        stateFactory(state);
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