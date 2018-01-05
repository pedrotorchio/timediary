import Axios from 'axios';
let axios = null;

export default class TimediaryApiService {
  constructor(baseUrl, endpoint) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;

    axios = Axios.create({});
  }

  get(id = '', config = {}) {

    id = this.url(id);

    return this.repromise(axios.get(id, config));
  }
  post(data, config = {}) {
    let url = this.url()

    return this.repromise(axios.post('', data, config));
  }
  put(id, data, config = {}) {
    id = this.url(id);

    return this.repromise(axios.put(id, data, config));
  }
  delete(id, config = {}) {
    id = this.url(id);

    return this.repromise(axios.delete('', config));
  }
  repromise(_promise) {
    return new Promise((resolve, reject) => _promise.then(resolve).catch(error => {
      if (error.request) {
        reject({
          data: error.request,
          error
        })
      } else
        reject({
          data: error.response.data,
          response: error.response,
          error
        });
    }));
  }
  url(id = '') {

    let url = `${this.baseUrl}/${this.endpoint}`;
    if (id !== '')
      url = `/${id}`;

    return url;
  }
}
