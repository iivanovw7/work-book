import { createMemoryHistory } from 'history';
import * as localized from './assets/locales.json';

// Mock browser history
export const history = createMemoryHistory('/dashboard');

// Grid config object for testing
export const mappedSizes = {
	xs: 12,
	sm: 12,
	md: 12,
	lg: 11
};

export const localizedText = {
	locales: localized.locales,
	topBar: localized.topBar,
	login: localized.login,
	navigation: localized.navigation,
	pageNotFound: localized.pageNotFound
};
