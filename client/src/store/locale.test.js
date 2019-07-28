import 'cross-fetch/polyfill';
import createStore from 'storeon';
import locale from './locale';

jest.mock('../utils/helpers');
jest.mock('js-cookie');
jest.mock('../config/apiURL', () => () => {
	return '/api';
});

describe('Testing locale store: ', () => {
	it('Should check current locale switch it and check again', async () => {
		const store = createStore([locale]);
		store.dispatch('changeLocale');
		expect(store.get().locale).toBe('eng');
		store.dispatch('changeLocale');
		expect(store.get().locale).toBe('rus');
	});
});
