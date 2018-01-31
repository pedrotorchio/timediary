export default {
    login(state, {email, token}){
        state.loginEmail = email;
        state.token = token;        
    },
    setAccount(state, account){
        
        state.info = account;
    },
}