import Cookies from 'js-cookie';
import axios from 'axios';
import { URL } from '../config/apiURL';
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
								return {
									success: true,
									message: text.login.loginSuccess[locale]
								};
							})
							.catch(() => ({
								success: false,
								message: text.login.loginError[locale]
							}));
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
							.catch(() => false);
}
