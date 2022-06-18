import axios  from "axios";


class TodoDataService {
    retrieveAllTodos(name){
        return axios.get(`http://localhost:9090/users/${name}/todos`)
    }

    retrieveTodo(name, id){
        return axios.get(`http://localhost:9090/users/${name}/todos/${id}`)
    }

    deleteTodoById(name, id){
        return axios.delete(`http://localhost:9090/users/${name}/todos/${id}`)
    }

}
 
export default new TodoDataService();