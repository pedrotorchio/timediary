import axios from 'axios';

export default {
    name:'tasks',
    namespaced: true,
    state:{
        openPatient: null
    },
    mutations:{
        setCurrentPatient(state, patient){
            state.openPatient = patient;
        }
    }
}