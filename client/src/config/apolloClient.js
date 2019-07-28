import '@babel/polyfill/noConflict';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import { URL } from './apiURL';

// Include token in every apollo-server request
export const client = new ApolloClient({
	uri: `${URL}/graphql`,
	cache: new InMemoryCache(),
	fetchOptions: {
		credentials: 'include'
	},
	request: async (operation) => {
		const token = await encodeURIComponent(Cookies.get('token'));
		operation.setContext({
			headers: {
				token
			}
		});
	}
});
