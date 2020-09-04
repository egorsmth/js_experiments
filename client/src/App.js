import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

import config from './config'
import Login from './components/loginForm';
import Logout from './components/logout';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Registration from './components/registrationForm';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path={config.routs.dashboard} component={Dashboard} />
      </Switch>
    );
  }
}
