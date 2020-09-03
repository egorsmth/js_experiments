import React, { Component } from "react";
import { Redirect } from "react-router-dom"

import config from "../config";

export default class Home extends Component {

  render() {
    return <Redirect to={config.routs.dashboard}></Redirect>;
  }
}