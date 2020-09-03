import React from "react";

import config from "../config"
import { registration } from "../services/auth"

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.key('user')) {
      this.props.history.push(config.routs.dashboard);
      window.location.reload();
    }
    this.state = {
      username: { error: '', value: '' },
      password: { error: '', value: '' },
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
    const response = await registration(this.state.username.value, this.state.password.value);

    if (response && response.error) {
      const state = { ...this.state };
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
    let nameError = "";
    let passError = "";
    if (this.state.username.error) nameError = <p style={{ color: 'red' }} >{this.state.username.error}</p>
    if (this.state.password.error) passError = <p style={{ color: 'red' }}>{this.state.password.error}</p>
    return (
      <div>
        <h1>Registration</h1>
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
          <input type="submit" value="Sign Up"></input>
        </form>
      </div>
    );
  }
}