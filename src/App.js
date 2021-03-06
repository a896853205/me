import  React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import LoginController from "./page/login-controller.js";
import BackgroundController from "./page/background-controller.js";
class App extends Component {
  render () {
    const NoMatch = () => <div>4 0 4  NOT  FOUND</div>;
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact component={LoginController} />
          <Route path='/background' component={BackgroundController} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default App;
