export default {
    clear({getters, dispatch}){
        
        getters.namespaces.forEach(module=>{
            
            let action = `${module}/clear`;
            if(this._actions[action]){
                dispatch(action);                
            }
        });
    }
}