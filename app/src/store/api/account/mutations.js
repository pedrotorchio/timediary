export default {
    login(state, {email, token}){
        
        state.loginEmail = email;
        state.token = token;
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setAccount(state, account){
        
        state.info = account;
    },
}