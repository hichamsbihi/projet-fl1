import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import MasterSwitcher from "../components/MasterSwitcher/MasterSwitcher";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";

export  default class App extends Component{
    render() {

        return(
            <div style={{backgroundColor: "aqua"}}>
            <BrowserRouter>
                <Switch>
                <Route path='/login' component={SignIn}/>
                <Route path='/register' component={SignUp}/>
                <Route path='/' component={MasterSwitcher}/>
                </Switch>
            </BrowserRouter>
            </div>
        )

    }
}



  
  
