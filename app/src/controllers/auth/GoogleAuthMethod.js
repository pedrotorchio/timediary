import Account from '@/models/Account';
import AuthMethod from './AuthMethod';
import provider from './providers/GoogleApi';

export default class GoogleAuthMethod extends AuthMethod{
  submit(){
    return provider.exists();
  }
}
