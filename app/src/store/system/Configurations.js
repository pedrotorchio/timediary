import AccountConfig from './configComponents/account/Account';
import AccountIcon from './configComponents/account/AccountIcon';

import {Element} from 'keepup-modules';

const tabs = [
    new Element({
        icon: AccountIcon,
        title: 'Usuário',
        component: AccountConfig,
        extra:{
            tooltip: 'Atualize suas informações pessoais'
        }
    })
];

export default {
    namespaced: true,
    state: {
        configTabs: tabs
    },
    getters: {
        configTabs(state){
            return state.configTabs;
        }
    },
    actions: {
    }    
}