import axios  from "axios";

class HelloWorldService {
    executeHelloWorldService(){
        return axios.get('http://localhost:9090/hello-world')
    }
    executeHelloWorldBeanService(){
        return axios.get('http://localhost:9090/hello-world-bean')
    }
    executeHelloWorldPathVariableService(name){
        return axios.get(`http://localhost:9090/hello-world/path-variable/${name}`)
    }
}

export default new HelloWorldService()