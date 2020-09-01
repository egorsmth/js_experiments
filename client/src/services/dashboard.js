import axios from 'axios'

import config from '../config'
import { getAccessToken } from "./auth"

export async function dashboard() {
  try {
    const token = getAccessToken();
    const response = await axios.get(config.server.url + config.server.routs.dashboard, {
      headers: {
        "x-access-token": token,
      }
    });
    return response.data;
  } catch (error) {

    return null;
  }
};