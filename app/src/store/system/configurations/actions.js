import {stateFactory} from './state';

export default {
    clear({state}){
        stateFactory(state);
    }
}