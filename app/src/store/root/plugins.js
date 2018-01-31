import VuexPersist from 'vuex-persist';
import {appName} from '../../config';

const persistence = (new VuexPersist({
    key: `${appName}-vuex`,
    storage: window.localStorage,
    reducer(state) {
        return{
            account:{
                token: state.account.token,
                loginEmail: state.account.loginEmail
            }
        }
    }
})).plugin;

export default [persistence];