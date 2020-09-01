import axios from "axios";

import config from "../config"

function _setAccessToken(data) {
  localStorage.setItem("user", data);
}

function _removeAccessToken() {
  localStorage.removeItem("user");
}

function getAccessToken() {
  return localStorage.getItem("user");
}

function login(username, password) {
  return axios
    .post(config.server.url + config.server.routs.login, {
      username,
      password
    })
    .then(response => {
      console.log(response);
      if (response.data.accessToken) {
        _setAccessToken(response.data.accessToken);
      }

      return response.data;
    });
}

async function registration(username, password) {
  try {
    const response = await axios.post(config.server.url + config.server.routs.registration, {
        username,
        password
      });
    console.log(response);
    if (response.data.accessToken) {
      _setAccessToken(response.data.accessToken);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function logout() {
  _removeAccessToken();
}

export {
  login,
  registration,
  logout,
  getAccessToken,
}