import ApiService from '../../store/api/ApiService';

let patientService = new ApiService('subject');
let accountService = new ApiService('account');

export default {
    namespaced: true,
    state:{
        list: [],
        patientsLoaded: false
    },
    getters:{
        list(state){
            return state.list;
        }
    },
    mutations:{
        addPatient(state, patient){
            state.list.push(patient);
        }
    },
    actions:{
        create({rootGetters, commit}, patient){
            return new Promise((resolve,reject)=>{
                
                patient.root = rootGetters['account/id'];;
            
                patientService.post(patient)
                    .then(response => {
                        commit('addPatient', patient);
                        resolve(response);
                    })
            });
        },
        update({}, patient){
            return new Promise((resolve,reject)=>{
                
                patientService.put(patient.id, patient)
                    .then(response => {
                        resolve(response);
                    })
            });
        },
        status({getters, dispatch}, idAndStatus){
            if(idAndStatus.status == 0){
                let i = getters.list.findIndex(pat => pat.id == idAndStatus.id);
                getters.list.splice(i , 1);
            }

            return dispatch('update', idAndStatus);
        },
        loadList({state, commit, rootGetters}){
            return new Promise((resolve, reject)=>{
                if(!state.patientsLoaded){
                    let id = rootGetters['account/id'];
                    accountService.get(id, {params:{ relationships: 'subjects', fields: 'id'}})
                        .then(response=>{
                            let patients = response.subjects;
                            patients.forEach(patient=> commit('addPatient', patient));
                            
                            state.patientsLoaded = true;
                            resolve(state.list);
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