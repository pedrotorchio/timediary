export default {
    loginInfo(state){
        return {
            email: state.loginEmail,
            token: state.token
        }
    },
    isLogged(state, getters){
        let info = getters.loginInfo;
        return info.token != null && info.email != null;
    },
    account(state, getters){
        return state.info;
    },
    authHeader(state, getters){
        let {token} = getters.loginInfo;
        
        if(!getters.isLogged)
            return {};

        return {
            Authorization: `Bearer ${token}`
        }
    },
    id(state, getters){
        let id = getters.account
        if(id != null)
            id = id.id;
        
        return id;
    },
    email(state, getters){
        let email = getters.account;
        if(email != null)
            email = email.email;

        return email;
    },
    root(state, getters){
        let root = getters.account;
        if(root != null){
            if(root.root == null)
                root = root.id;
            else
                root = root.root;
        }
        return root;
    }
};