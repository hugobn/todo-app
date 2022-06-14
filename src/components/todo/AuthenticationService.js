class AuthenticationService {
    registerSucessfulLogin(username, password){
        console.log('registerSucessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
    }
}

export default new AuthenticationService()