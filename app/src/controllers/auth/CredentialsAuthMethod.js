import AuthMethod from './AuthMethod';
import provider from './providers/EmailPasswordFirebase';

export default class CredentialsAuthMethod extends AuthMethod{
  constructor(email, password){
    super();
    this.email = email;
    this.password = password;
  }

  exists(){
    return provider.exists(this.email, this.password);
  }
  register(){
    return provider.create(this.email, this.password);
  }
}
