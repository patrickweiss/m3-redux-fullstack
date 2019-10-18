import React, { Component } from 'react'
import { ActionType, IAction } from "../framework/IAction";
import { IAssetData, IUser } from "../state/appState";



export default class Login extends Component {
    
    render() {
        return (
            <div>
                <h1>Login</h1>
                <label htmlFor="username">Username:</label>
                <input type="username" name="username"/>
                <br/>
                <label htmlFor="username">Password:</label>
                <input type="password" name="password"/>
                <br/>
            </div>
        )
    }
}
