import axios from 'axios';
export default class TimediaryApiService{
    constructor(baseUrl, endpoint){
        this.baseUrl = baseUrl;
        this.endpoint = endpoint;

        axios = axios.create({
            baseUrl: `${baseUrl}/${endpoint}`
        });
    }

    get(id = '', config = {}){
        return axios.get(`/${id}`, config);
    }
    post(data, config = {}){
        return axios.post('', data, config);
    }
    put(id, data, config = {}){
        return axios.put(`/${id}`, data, config);
    }
    delete(id, config = {}){
        return axios.delete(`/${id}`, config);
    }
}