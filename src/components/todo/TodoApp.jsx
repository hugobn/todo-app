import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import withNavigation from "./WithNavigation";
import withParams from "./withParams";

class TodoApp extends Component{
    render(){
        const LoginComponentWithNavegation = withNavigation(LoginComponent)
        const WelcomeComponentWithParams = withParams(WelcomeComponent)
        return(
            <div className="TodoApp">
                <Router>
                    <Routes>
                        <Route path="/" exact element={<LoginComponentWithNavegation/>}/>
                        <Route path="/login" element={<LoginComponentWithNavegation/>}/>
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams/>}/>
                        <Route path="/todos" element={<ListTodosComponent/>}/>
                        <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>
                </Router>

                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

function ErrorComponent(){
    return <div>An Error Ocurred. I don't know what to do! Contact Support</div>
}


class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos:
                [ 
                    {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date()},
                    {id: 2, description: 'Become an Expert at React', done: false, targetDate: new Date()},
                    {id: 3, description: 'Visit India', done: false, targetDate: new Date()}
                ]
        }
    }

    render(){
        return(
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Is Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map (
                                todo => 
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

class WelcomeComponent extends Component{
    render(){
        return(
            <div>
                Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>
            </div>
        )
    }
}

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSucessMessage: false,
        }
//        this.handleUsernameChange = this.handleUsernameChange.bind(this)
//        this.handlePasswordChange = this.handlePasswordChange.bind(this)
          this.handleChange = this.handleChange.bind(this)
          this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

/*    handleUsernameChange(event){
        console.log(event.target.name)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
*/
/*    handlePasswordChange(event){
        console.log(event.target.value)
        this.setState(
            {
                password: event.target.value
            }
        )
    }
*/

    loginClicked(){
        //in28minutes, dummy
        if(this.state.username==='in28minutes' && this.state.password==='dummy'){
            this.props.navigate(`/welcome/${this.state.username}`)
            //this.setState({showSucessMessage: true})
            //this.setState({hasLoginFailed: false})
        }else{
            console.log("Failed")
            this.setState({showSucessMessage: false})
            this.setState({hasLoginFailed: true})
        }
    }

    render(){
        return(
            <div>
            {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
            {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
            {this.state.showSucessMessage && <div>Login Sucessful</div>}
            {/*<ShowLoginSucessMessage showSucessMessage={this.state.showSucessMessage}/>*/}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}

/*
function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div>Invalid Credentials</div>
    }
    return null
}

function ShowLoginSucessMessage(props){
    if(props.showSucessMessage){
        return <div>Login Sucessful</div>
    }
    return null
}
*/

export default TodoApp