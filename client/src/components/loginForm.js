import React from "react";

import config from "../config";
import { login } from "../services/auth";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.key('user')) {
      this.props.history.push(config.routs.dashboard);
      window.location.reload();
    }
    this.state = {
      login: { value: '' },
      password: { value: '' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await login(this.state.login, this.state.password);
    this.props.history.push(config.routs.dashboard);
    window.location.reload();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name
            <br></br>
            <input type="text" name="login" value={this.state.login.value} onChange={this.handleChange}></input>
            <br></br>
          </label>
          <label>Password
            <br></br>
            <input type="password" name="password" value={this.state.password.value} onChange={this.handleChange}></input>
            <br></br>
          </label>
          <input type="submit" value="Sign in"></input>
        </form>
        <Link to={config.routs.registration}>Sign Up</Link>
      </div>
    );
  }
}
