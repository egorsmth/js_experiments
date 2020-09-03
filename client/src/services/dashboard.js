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

export async function getUsers() {
  try {
    const token = getAccessToken();
    const response = await axios.get(config.server.url + config.server.routs.users, {
      headers: {
        "x-access-token": token,
      }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getProducts() {
  try {
    const token = getAccessToken();
    const response = await axios.get(config.server.url + config.server.routs.products, {
      headers: {
        "x-access-token": token,
      }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function createPurchase(userId, productId, quantity) {
  try {
    const token = getAccessToken();
    const response = await axios.post(config.server.url + config.server.routs.purchase,
      {
        userId, productId, quantity
      },
      {
        headers: {
          "x-access-token": token,
        }
      });
    return response.data;
  } catch (error) {
    return null;
  }
}