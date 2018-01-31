import Router from '@/router';
import axios from 'axios';

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