import Service from './TimediaryApiService';

export default class AuthService extends Service{
    constructor(baseUrl){
        super(base, 'auth');
    }
    login(email, password){
        let authorization = btoa(`${email}:${password}`);
        console.log(authorization);
        super.get('', {
            headers: {
                Authorization: `basic ${authorization}`
            }
        });
    }
}