import axios from "axios"

class AuthenticationService {
    registerSucessfulLogin(username, password){
        console.log('registerSucessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors()
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

    setupAxiosInterceptors(){
        let username = 'in28minutes'
        let password = 'dummy'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()