import { Component } from "react"

import React from "react"
import { Redirect } from "react-router-dom";

import { logout } from "../services/auth"
import config from "../config"

export default class Logout extends Component {

  constructor(props) {
    super(props);
    logout();
  }

  render() {
    return <Redirect to={config.routs.login}></Redirect>;
  }
}