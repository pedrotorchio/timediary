export default {
    namespaces(state){
        let nsList = [];
        for(module in state){
            if(state.hasOwnProperty(module))
                nsList.push(module);
        }
        
        return nsList;
    }
}