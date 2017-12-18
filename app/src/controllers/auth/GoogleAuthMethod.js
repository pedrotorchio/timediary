import Account from '@/models/Account';
import AuthMethod from './AuthMethod';
import provider from './providers/GoogleFirebase';

export default class CredentialsAuthMethod extends AuthMethod{
  exists(){
    return provider.exists();
  }
}
