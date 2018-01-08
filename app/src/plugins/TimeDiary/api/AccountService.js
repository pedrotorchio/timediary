import Service from './TimediaryApiService';

export default class AccountService extends Service{
    constructor(baseUrl){
        super(baseUrl,'account');
    }
    getInfo(email, options){
        return super.get(email, options);
    }
    getModules(email, options){
        return new Promise((resolve, reject)=>{
            resolve([]);            
        });
    }
}