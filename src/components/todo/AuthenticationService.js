class AuthenticationService {
    registerSucessfulLogin(username, password){
        console.log('registerSucessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }
}

export default new AuthenticationService()