import Axios from 'axios';
import {apiUrl} from '../../config';
import qs from 'qs';



let axios = null;

export default class ApiService {
  constructor(endpoint) {
    
    this.endpoint = `${apiUrl}/${endpoint}`;

    axios = Axios.create();
  }
  
  get(id = '', config = {}) {

    id = this.url(id);
    
    return this.repromise(axios.get(id, config));
  }
  post(data, config = {}) {
    

    if(!config.formData)
      data = qs.stringify(data, {skipNulls: true});
      
    let url = this.url()
    
    return this.repromise(axios.post(url, data, config));
  }
  put(id, data, config = {}) {

    if(!config.formData)
      data = qs.stringify(data, {skipNulls: true});

    id = this.url(id);
    
    return this.repromise(axios.put(id, data, config));
  }
  delete(id, config = {}) {
    id = this.url(id);

    return this.repromise(axios.delete(id, config));
  }
  repromise(_promise) {
    return new Promise((resolve, reject) => _promise.then(response=>{
      resolve(response.data);
    }).catch(error => {
      
      let code, message, data;      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        data = error.response.data.data;
        code = error.response.data.code;
        message = error.response.data.message;

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        
          code = error.request.status;
          message = error.request.statusText || error.message;
          data = error.request;

        
      } else {
        // Something happened in setting up the request that triggered an Error
        code = -1;
        message = "Erro de conexão";
        data = error;
      }

      reject({code, message, data});
      

    }));
  }
  url(id = null) {
    
    let url = '';
        url = this.endpoint;
    if (id && id !== '')
      url += `/${id}`;

    return url;
  }
}
