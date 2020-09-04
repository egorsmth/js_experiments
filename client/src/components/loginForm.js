import React from "react";

import { Container, TextField, Button, Box } from "@material-ui/core"

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
      <Container maxWidth="sm">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {nameError}
          <Box m={1, 1, 1, 1}>
            <TextField
              required
              label="Username"
              name="username"
              value={this.state.username.value}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Box>
          
          {passError}
          <Box m={1, 1, 1, 1}>
            <TextField
              required
              label="Password"
              name="password"
              value={this.state.password.value}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Box>

          <Box m={1, 1, 1, 1}>
            <Button type="submit" variant="contained" color="primary">
              Sign in
            </Button>
          </Box>
        </form>
        <Box m={1, 1, 1, 1}>
          <Button variant="contained">
            <Link to={config.routs.registration}>Sign Up</Link>
          </Button>
        </Box>

      </Container>
    );
  }
}
