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

async function login(username, password) {
  try {
    const response = await axios.post(config.server.url + config.server.routs.login, {
      username,
      password
    });
    if (response.data.accessToken) {
      _setAccessToken(response.data.accessToken);
    }
  } catch (err) {
    if (err.response.status == 400) {
      return { error: err.response.data };
    }
  }
}

async function registration(username, password) {
  try {
    const response = await axios.post(config.server.url + config.server.routs.registration, {
      username,
      password
    });
    if (response.data.accessToken) {
      _setAccessToken(response.data.accessToken);
    }

    return response.data;
  } catch (err) {
    if (err.response.status == 400) {
      return { error: err.response.data };
    }
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