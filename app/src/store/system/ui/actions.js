import {stateFactory} from './state';

export default {
    modulesClear({state}){
        
    },
    clear({state}){
        stateFactory(state);
    },
    modulesLoad({getters, commit}){

    }
}   