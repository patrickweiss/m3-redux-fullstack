import React, { Component } from "react";
import { ActionType, IAction } from "../framework/IAction";
import { IUser, IState } from "../state/appState";
import axios from "axios";
import { IWindow } from "../framework/IWindow";
import { reducerFunctions } from "../reducer/appReducer";
import history from '../history'

declare let window: IWindow;

export interface IUserAction extends IAction {
  user: IUser;
}

interface IJSXState {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  
}

interface IProps {
  history?: any,
  location?: any,
  match?: any
  stateCounter?: any;
}

reducerFunctions[ActionType.signup] = function(
  newState: IState,
  action: IUserAction
) {
  newState.BM.user = action.user;
  return newState;
};

export default class Register extends React.PureComponent<IProps, IJSXState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.setFirstname = this.setFirstname.bind(this);
    this.setLastname = this.setLastname.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.handleSignUp}>
        <label>
          First Name:
          <input
            type="text"
            name="username"
            value={this.state.firstname}
            onChange={this.setFirstname}
          />
        </label>
        <label>
          Second Name:
          <input
            type="text"
            name="username"
            value={this.state.lastname}
            onChange={this.setLastname}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.setUsername}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.setPassword}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  setFirstname(event: any) {
    this.setState({
      firstname: event.target.value
    });
  }

  setLastname(event: any) {
    this.setState({
      lastname: event.target.value
    });
  }

  setUsername(event: any) {
    this.setState({
      username: event.target.value
    });
  }

  setPassword(event: any) {
    this.setState({
      password: event.target.value
    });
  }

  handleSignUp(event: any) {
    event.preventDefault();

    const newUser: IUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("http://localhost:8080/signup", newUser)
      .then((response) => {
        console.log(this.props.history)
        this.props.history.push('/')});

    const action: IUserAction = {
      type: ActionType.signup,
      user: newUser
    };
    window.CS.clientAction(action);
  }
}
