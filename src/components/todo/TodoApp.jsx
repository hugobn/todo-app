import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import withNavigation from "./WithNavigation";
import withParams from "./withParams";
import AuthenticationService from "./AuthenticationService.js";

class TodoApp extends Component{
    render(){
        const LoginComponentWithNavegation = withNavigation(LoginComponent)
        const WelcomeComponentWithParams = withParams(WelcomeComponent)
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent)
        return(
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                        <Routes>
                            <Route path="/" exact element={<LoginComponentWithNavegation/>}/>
                            <Route path="/login" element={<LoginComponentWithNavegation/>}/>
                            <Route path="/welcome/:name" element={<WelcomeComponentWithParams/>}/>
                            <Route path="/todos" element={<ListTodosComponent/>}/>
                            <Route path="/logout" element={<LogoutComponent/>}/>
                            <Route path="*" element={<ErrorComponent/>}/>
                        </Routes>
                    <FooterComponent/>
                </Router>

                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        //console.log(isUserLoggedIn)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://courses.in28minutes.com/" className="navbar-brand">in28minutes</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted">All Rights Reserve 2018 @in28minutes</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <>
                <h1>You are Logout</h1>
                <div className="container">
                    Thank you for using our Application
                </div>
            </>
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

class WelcomeComponent extends Component{
    render(){
        return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>
                </div>
            </>

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
            AuthenticationService.registerSucessfulLogin(this.state.username, this.state.password)
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
                <h1>Login</h1>

                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/*this.state.showSucessMessage && <div>Login Sucessful</div>*/}
                    {/*<ShowLoginSucessMessage showSucessMessage={this.state.showSucessMessage}/>*/}
                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-sucess" onClick={this.loginClicked}>Login</button>
                </div>
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