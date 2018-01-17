import ApiService from '../../store/api/ApiService';
import axios from 'axios';

export default {
    namespaced: true,
    state:{
        list: [],
        inactiveList: [],
        patientsLoaded: false,
        inactivePatientsLoaded: false
    },
    getters:{
        list(state){
            return state.list;
        }
    },
    mutations:{
        addPatient(state, patient){
            state.list.push(patient);
        },
        addInactive(state, patient){
            state.inactiveList.push(patient);
        },
    },
    actions:{
        create({rootGetters, commit}, patient){
            return new Promise((resolve,reject)=>{
                
                patient.root = rootGetters['account/root'];
                let id = rootGetters['account/id'];
            
                axios.post('/subject', patient)
                    .then(response => {

                        let patient = response.data;
                        
                        axios.put(`/subject/${patient.id}/accounts`, {accounts: id})
                            .then(()=>{
                                commit('addPatient', patient);
                                resolve(response);
                            });
                    })
                
            });
        },
        update({}, patient){
            return new Promise((resolve,reject)=>{
                
                axios.put(`/subject/${patient.id}`, patient)
                    .then(response => {
                        resolve(response);
                    })
            });
        },
        activate({dispatch, state, commit}, id){
            return new Promise((resolve,reject)=>{
                dispatch('update', {id, status: 1})
                    .then(()=>{
                        let i = state.inactiveList.findIndex(p=>p.id==id);
                        let p = (state.inactiveList.splice(i, 1))[0];
                        commit('addPatient', p);
                    });
            });
        },
        deactivate({dispatch, state, commit}, id){
            return new Promise((resolve,reject)=>{
                dispatch('update', {id, status: 0})
                    .then(()=>{
                        let i = state.list.findIndex(p=>p.id==id);
                        let p = (state.list.splice(i, 1))[0];
                        commit('addInactive', p);
                    });
            });
        },
        status({getters, dispatch}, idAndStatus){
            if(idAndStatus.status == 0){
                let i = getters.list.findIndex(pat => pat.id == idAndStatus.id);
                getters.list.splice(i , 1);
            }

            return dispatch('update', idAndStatus);
        },
        loadInactive({state, commit, rootGetters}){
            return new Promise((resolve, reject)=>{
                if(!state.inactivePatientsLoaded){
                    let id = rootGetters['account/id'];

                    axios.get(`account/${id}/subjects`, {
                        params: { conditions:['status:=0'] }
                    })
                        .then(response=>{
                            let patients = response.data;
                            
                            patients.forEach(patient=> commit('addInactive', patient));
                            state.inactivePatientsLoaded = true;
                            resolve(state.inactiveList);
                        });    
                
                }else resolve(state.list);
                
            });
        },
        loadList({state, commit, rootGetters}){
            return new Promise((resolve, reject)=>{
                if(!state.patientsLoaded){
                    let id = rootGetters['account/id'];

                    
                    axios.get(`account/${id}/subjects`)
                        .then(response=>{
                            let patients = response.data;
                            patients.forEach(patient=> commit('addPatient', patient));
                            
                            state.patientsLoaded = true;
                            resolve(state.inactivelist);
                        });    
                
                }else resolve(state.list);
                
            });
        },
        clear({state}){
            state.list.length = 0;
            state.patientsLoaded = false;
        }
    }
};