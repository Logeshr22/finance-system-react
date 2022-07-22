class Auth{
    constructor(){
        this.authenticated = false;
    }
    login(cb){
        this.authenticated = true;
    }
    logout(cb){
        this.authenticatd = false;
    }
    isAuthenticated(){
        return this.authenticated;  
    }
}

export default new Auth();
