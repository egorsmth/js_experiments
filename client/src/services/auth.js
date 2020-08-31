import Axios from "axios";

import config from "../config"

function login(username, password) {
  return Axios
    .post(config.server.url + config.server.routs.login, {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

function registration(username, password) {
  return Axios
    .post(config.server.url + config.server.routs.registration, {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

export {
  login,
  registration,
}