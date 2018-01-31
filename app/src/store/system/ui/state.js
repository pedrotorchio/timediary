export function stateFactory(state={}){
    return Object.assign(state, {
        uiLogged: false
    });
}
export default stateFactory();