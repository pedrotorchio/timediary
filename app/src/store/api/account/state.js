export function stateFactory(state={}){
    return Object.assign(state, {
        loginEmail: null,
        token: null,
        info: null
    });
}
export default stateFactory();