import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

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
                ],
            message: null,

        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
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
        if(this.state.id === -1){
            return
        }
        console.log('componenDidMount')
        this.refreshTodos()
    }

    refreshTodos(){
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

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        //console.log("user:" + username + ", id:" + id)
        TodoDataService.deleteTodoById(username, id)
        .then(
            response => {
                this.setState({
                    message: `Delete of todo ${id} successful`
                })
                this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id){
        console.log('update ' + id)
        this.props.navigate(`/todos/${id}`)
        /*let username = AuthenticationService.getLoggedInUserName()
        //console.log("user:" + username + ", id:" + id)
        TodoDataSthis.props.navigateervice.deleteTodoById(username, id)
        .then(
            response => {
                this.setState({
                    message: `Delete of todo ${id} successful`
                })
                this.refreshTodos()
            }
        )*/
    }

    addTodoClicked(){
        this.props.navigate('/todos/-1')
    }

    render(){
        console.log('render')
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Done</th>
                                <th>Is Completed</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className='btn btn-success' onClick={() => {this.updateTodoClicked(todo.id)}}>Update</button></td>
                                        <td><button className='btn btn-warning' onClick={() => {this.deleteTodoClicked(todo.id)}}>Delete</button></td>
                                    </tr>
                                    )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                            <button className='btn btn-success' onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent