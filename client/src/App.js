import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

import config from './config'
import Login from './components/loginForm';
import Home from './components/home';
import Dashboard from './components/dashboard';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path={config.routs.dashboard} component={Dashboard} />
        </Switch>
      </div>
    );
  }
}
