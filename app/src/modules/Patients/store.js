import axios from 'axios';

export default {
    namespaced: true,
    state:{
        list: [],
        inactiveList: [],
        diagnosticList: [],
        patientsLoaded: false,
        inactivePatientsLoaded: false,
        diagnosticsLoaded: false
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
        addDiagnostic(state, diagnostic){
            state.diagnosticList.push(diagnostic);
        },
        addDiagnostic2Patient(state, {id, diagnosticId}){
            state.list.find(pat => pat.id == id).diagnostics.push(state.diagnosticList.find(d=>d.id == diagnosticId));
        },
        removeDiagnostic2Patient(state, {id, diagnosticId}){
            
            let diags = state.list.find(pat => pat.id == id).diagnostics;
            let i = diags.findIndex(diag => diag.id == diagnosticId);
            
            diags.splice(i, 1);
        }
    },
    actions:{
        unassignDiagnostic({commit}, {id, diagnosticId}){
            
            return new Promise((resolve,reject)=>{
                axios.delete(`/subject/${id}/diagnostics`, {data: {diagnostics: diagnosticId}})
                    .then(resolve=>{
                        commit('removeDiagnostic2Patient', {id, diagnosticId});
                    });
            })
        },
        assignDiagnostic({commit}, {id, diagnosticId}){
            return new Promise((resolve,reject)=>{
                axios.put(`/subject/${id}/diagnostics`, {diagnostics: diagnosticId})
                    .then(resolve=>{
                        commit('addDiagnostic2Patient', {id, diagnosticId});
                    });
            })
        },
        createDiagnostic({rootGetters, commit, state}, title){
            return new Promise((resolve, reject)=>{
                const root = rootGetters['account/root'];
                const diagnostic = {
                    title,
                    root
                }

                axios.post('/diagnostic', diagnostic)
                    .then(response => {
                        commit('addDiagnostic', response.data);
                        resolve(response.data);
                    });
            });
        },
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
        loadDiagnostics({state, rootGetters, commit}){
            return new Promise((resolve, reject)=>{
                if(!state.diagnosticsLoaded){
                    let root = rootGetters['account/root'];
                    
                    axios.get(`/diagnostic`,{params: {conditions:[`root:=${root}`]}})
                        .then((response)=>{
                            response.data.forEach(diagnostic => commit('addDiagnostic', diagnostic));
                            state.diagnosticsLoaded = true;
                        });
                    axios.get(`/diagnostic`,{params: {conditions:[`root:=null`]}})
                        .then((response)=>{
                            response.data.forEach(diagnostic => commit('addDiagnostic', diagnostic));
                        });
                }
            });
        },
        loadList({state, commit, rootGetters}){
            return new Promise((resolve, reject)=>{
                if(!state.patientsLoaded){
                    let id = rootGetters['account/id'];

                    
                    axios.get(`account/${id}/subjects`)
                        .then(response=>{
                            let patients = response.data;
                            patients.forEach(patient=> {
                                axios.get(`subject/${patient.id}/diagnostics`)
                                    .then(response => {
                                        patient.diagnostics = response.data;
                                        commit('addPatient', patient)
                                    });
                            });
                            
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