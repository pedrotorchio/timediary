import ApiService from '../../store/api/ApiService';

let patientService = new ApiService('subject');
export default {
    namespaced: true,
    state:{
        patientsList: []
    },
    
    actions:{
        create({actions}, patient){
            console.dir(patient);
            patientService.post('', patient)
                .then(response => console.log(response))
                .catch(error =>console.log(error));
        }
    }

};