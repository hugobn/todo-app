import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import withNavigation from "./WithNavigation";
import withParams from "./withParams";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListTodosComponent from "./ListTodosComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component{
    render(){
        const LoginComponentWithNavegation = withNavigation(LoginComponent)
        const WelcomeComponentWithParams = withParams(WelcomeComponent)
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent)
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent))
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent)
        return(
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                        <Routes>
                            <Route path="/" exact element={<LoginComponentWithNavegation/>}/>
                            <Route path="/login" element={<LoginComponentWithNavegation/>}/>
                            <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>}/>
                            <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponentWithParamsAndNavigation/></AuthenticatedRoute>}/>
                            <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponentWithNavigation/></AuthenticatedRoute>}/>
                            <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}/>
                            <Route path="*" element={<ErrorComponent/>}/>
                        </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

export default TodoApp