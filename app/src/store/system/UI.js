export default {
    namespaced: true,
    state: {
        
        uiLogged: false
    },
    getters: {
        
        uiLogged(state){
            return state.uiLogged;
        }
    },
    mutations: {
        uiLogged(state, value){
            state.uiLogged = value;
        },

    },
    actions: {
        modulesClear({state}){
            
        },
        clear({commit}){
            commit('uiLogged', false);
        },
        modulesLoad({getters, commit}){

        }
    }    
}