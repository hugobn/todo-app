class AuthenticationService {
    registerSucessfulLogin(username, password){
        console.log('registerSucessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null){
            return false
        }else{ return true }
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null){
            return ""
        }else return user
    }
}

export default new AuthenticationService()