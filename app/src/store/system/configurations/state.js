import AccountConfig from './components/account/Account';
import AccountIcon from './components/account/AccountIcon';

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

export function stateFactory(state={}){
    return Object.assign(state, {
        configTabs: tabs
    });
}
export default stateFactory();