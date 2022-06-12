import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Routes } from "react-router-dom/umd/react-router-dom.development";

class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <Routes>
                        <Route path="/"  exact element={<LoginComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/welcome" element={<WelcomeComponent/>}/>
                    </Routes>
                </Router>

                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

class WelcomeComponent extends Component{
    render(){
        return(
            <div>
                Welcome Component
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
            console.log("Sucessful")
            this.setState({showSucessMessage: true})
            this.setState({hasLoginFailed: false})
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