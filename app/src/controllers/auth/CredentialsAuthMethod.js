import AuthMethod from './AuthMethod';
import Account from '@/models/Account';
// import provider from './providers/EmailPasswordFirebase';

export default class CredentialsAuthMethod extends AuthMethod{
  constructor(email, password){
    super();
    this.email = email;
    this.password = password;
  }
  submit(){
    return new Promise((resolve)=>{
      let acc = new Account(this.email);
          acc.password = this.password;
      resolve(acc);
    });
  }
}
