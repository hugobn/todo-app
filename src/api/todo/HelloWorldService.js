import axios  from "axios";

class HelloWorldService {
    executeHelloWorldService(){
        return axios.get('http://localhost:9090/hello-world')
    }
}

export default new HelloWorldService()