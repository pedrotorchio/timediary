import Service from './TimediaryApiService';

export default class AuthService extends Service{
    constructor(baseUrl){
        super(baseUrl, 'auth');
    }
    login(email, password){
        let authorization = btoa(`${email}:${password}`);
        
        return super.get('', {
            headers: {
                Authorization: `basic ${authorization}`
            }
        });
    }
}