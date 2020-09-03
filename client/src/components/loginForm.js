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
      username: { error: '', value: '' },
      password: { error: '', value: '' },
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const state = { ...this.state };
    state[event.target.name].value = event.target.value;
    this.setState(state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ ...this.state, loading: true });
    const response = await login(this.state.username.value, this.state.password.value);

    if (response && response.error) {
      const state = { ...this.state, loading: false };
      for (let err of response.error.details) {
        const key = err.path[err.path.length - 1];
        state[key].error = err.message;
        state[key].value = err.value;
      }
      return this.setState(state);
    }
    this.props.history.push(config.routs.dashboard);
    window.location.reload();
  }

  render() {
    let loading;
    if (this.state.loading) {
      loading = <img src={process.env.PUBLIC_URL + '/loading.gif'} width='60' height='50' />
    }

    let nameError = "";
    let passError = "";
    if (this.state.username.error) nameError = <p style={{ color: 'red' }} >{this.state.username.error}</p>
    if (this.state.password.error) passError = <p style={{ color: 'red' }}>{this.state.password.error}</p>

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username
            <br></br>
            {nameError}
            <input type="text" name="username" value={this.state.username.value} onChange={this.handleChange}></input>
            <br></br>
          </label>
          <label>Password
            <br></br>
            {passError}
            <input type="password" name="password" value={this.state.password.value} onChange={this.handleChange}></input>
            <br></br>
          </label>
          <input type="submit" value="Sign in"></input>
        </form>
        <p>{loading}</p>
        <Link to={config.routs.registration}>Sign Up</Link>
      </div>
    );
  }
}
