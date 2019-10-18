import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import ShowAssets from './components/ShowAssets';
import { Switch, Route } from 'react-router-dom';
import { IAction, ActionType } from './framework/IAction';
import { IAssetData, IState, IUser } from './state/appState'
import axios from 'axios';
import { reducerFunctions } from './reducer/appReducer';

import { IWindow } from './framework/IWindow'
declare let window: IWindow;

interface IProps {
  stateCounter: number,
  history?: any,
  location?: any,
  match?: any
}

export interface IAssetsLoadedAction extends IAction {
  assets: IAssetData[]
}
reducerFunctions[ActionType.server_called] = function (newState: IState, action: IAction) {
  newState.UI.waitingForResponse = true;
  return newState;
}
reducerFunctions[ActionType.add_assets_from_server] = function (newState: IState, action: IAssetsLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.assets = action.assets;
  return newState;
}
export default class App extends React.PureComponent<IProps> {

  componentDidMount() {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
    axios.get('http://localhost:8080/assets/read').then(response => {
      console.log("this data was loaded as a result of componentDidMount:");
      console.log(response.data);
      const responseAction: IAssetsLoadedAction = {
        type: ActionType.add_assets_from_server,
        assets: response.data as IAssetData[]
      }
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })
  }

  render() {
    console.log(this.props)
    window.CS.log("App --> render()")
    return (
      <>
        <NavBar />
          <button onClick={() => 
    this.props.history.push("/register")}>click me</button>
        <Switch>
          <Route path="/showassets" render={props => <ShowAssets {...props}/>} />
          <Route path="/register" render={props => <Register {...props}/>} />
          <Route path="/" render={props => <Login {...props}/>} />
        </Switch>

      </>
    );
  }

}

