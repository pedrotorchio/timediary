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
    remove(state, module){
        console.log('remove', module);
        
        module.sidetabs.forEach(tab=>{
            const i = state.sidetabs.findIndex(_tab => _tab.uid == tab.uid);
            state.sidetabs.splice(i, 1);
        });
        module.widgets.forEach(widget=>{
            const i = state.widgets.findIndex(_widget => _widget.uid == widget.uid);
            state.widgets.splice(i, 1);
        });

        delete state.list[module.uid];
    },
    doneLoading(state){
        state.doneLoading = true;
    }
}