class Auth {
    constructor(props) {
      this.authenticated = false;
    }
  
    login(values,cb) {
      this.authenticated = true;
      setTimeout(cb, 1000); 
    }
  
    logout(cb) {
      this.authenticated = false;
      setTimeout(cb, 1000); 
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
 
  export default new Auth()
  