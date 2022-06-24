import axios from "axios"

class AuthenticationService {

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    executeJwtAuthenticationService(username, password){
        return axios.post('http://localhost:9090/authenticate',
            {
                username,
                password
            }
        )
    }

    executeBasicAuthenticationService(username, password){
        return axios.get('http://localhost:9090/basicauth',
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password)
                }
            }
        )
    }

    registerSucessfulLoginForJwt(username, token){
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token){
        return 'Bearer ' + token
    }

    registerSucessfulLogin(username, password){
        //console.log('registerSucessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
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

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()