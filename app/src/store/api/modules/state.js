export function stateFactory(state={}){
    return Object.assign(state, {
        list: {},
        doneLoading: false,
        sidetabs: [],
        widgets: []
    });
}
export default stateFactory();