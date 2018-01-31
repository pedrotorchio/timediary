export default {
    add(state, module){
        module.sidetabs.forEach(tab=>{
            state.sidetabs.push(tab);
        });
        module.widgets.forEach(widget=>{
            state.widgets.push(widget);
        });
        state.list[module.uid] = module;
    },
    doneLoading(state){
        state.doneLoading = true;
    }
}