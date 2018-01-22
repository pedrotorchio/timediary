import axios from 'axios';

export default {
    name:'tasks',
    namespaced: true,
    state:{
        currPatientId: null
    },
    mutations:{
        setCurrPatientId(state, id){
            state.currPatientId = id;
        }
    },
    getters:{
        currPatient(state, getters, rootState, rootGetters){
            let patient = state.currPatientId;
            
            if(patient !== null){
                patient = rootGetters['patients/list'].find(pat => pat.id == patient);
            }

            return patient;
        }
    }
}