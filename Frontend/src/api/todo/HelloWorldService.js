import axios  from "axios";

class HelloWorldService {
    executeHelloWorldService(){
        return axios.get('http://localhost:9090/hello-world')
    }
    executeHelloWorldBeanService(){
        return axios.get('http://localhost:9090/hello-world-bean')
    }
    executeHelloWorldPathVariableService(name){
    /*  // this is already taken of the axios interceptor implemented in AuthenticationService.js file
        let username = 'in28minutes'
        let password = 'dummy'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
    */
        return axios.get(`http://localhost:9090/hello-world/path-variable/${name}`
        /*,
            {
                headers: {
                    authorization: basicAuthHeader
                }
            }
        */
        )
    }
}

export default new HelloWorldService()