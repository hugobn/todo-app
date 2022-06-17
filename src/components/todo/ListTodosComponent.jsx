import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component{
    constructor(props){
        console.log('Constructor')
        super(props)
        this.state = {
            todos:
                [ 
/*                    {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date()},
                    {id: 2, description: 'Become an Expert at React', done: false, targetDate: new Date()},
                    {id: 3, description: 'Visit India', done: false, targetDate: new Date()}
*/
                ]
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    //to improve some app perfomance
    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount(){
        console.log('componenDidMount')
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)         //make the call to the API
        .then(
            response => {
                //console.log(response)
                this.setState(
                    {
                        todos: response.data
                    }
                )
            }
        )
    }

    render(){
        console.log('render')
        return(
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Done</th>
                                <th>Is Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent