import React from "react";
import { registration } from "../services/auth"

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
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
    const response = await registration(this.state.login, this.state.password);
  }

  render() {
    return (
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
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}