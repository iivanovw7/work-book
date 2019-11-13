import Cookies from 'js-cookie';
import axios from 'axios';
import { URL } from '../config/apiURL';
import Logger from './logger';
import * as constants from '../constants';
/* eslint indent:0 */

const inOneMonth = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30));

export function ifTokenExists() {
  return Cookies.get('token') !== 'undefined';
}


/**
 * Login user function, saves returned jwt token,
 * returns localized message and boolean result.
 *
 * @param email
 * @param password
 * @param locale
 * @param text
 * @returns {Promise<{success: boolean, message: *}>}
 */
export async function loginUser(email, password, locale, text) {
  return axios.post(`${URL}/auth/login`, {
    email,
    password
  }, { withCredentials: true })
    .then((response) => {
      Cookies.set('token', response.data.token, { expires: inOneMonth });
      Logger.send({
        type: constants.LOGGER_SUCCESS,
        message: 'loginUser success'
      });

      return {
        success: true,
        message: text.login.loginSuccess[locale]
      };
    })
    .catch((error) => {
      Logger.send({
        type: constants.LOGGER_ERROR,
        message: `loginUser error: ${error}`
      });

      return {
        success: false,
        message: text.login.loginError[locale]
      };
    });
}

/**
 * Verifies user token, returns user object if token is valid.
 * @param withDetails (return either user object either boolean value)
 * @returns {Promise<AxiosResponse<T> | boolean>}
 */
export async function checkUser(withDetails) {
  const encodedValue = encodeURIComponent(Cookies.get('token'));

  return axios.get(`${URL}/auth/login?token=${encodedValue}`, { withCredentials: true })
    .then((response) => {
      if (withDetails) {
        return response.data.user;
      }
      return !!response.data.user.email;
    })
    .catch((error) => {
      Logger.send({
        type: constants.LOGGER_ERROR,
        message: `checkUser error: ${error}`
      });
      return false;
    });
}
