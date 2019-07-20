import * as localized from '../assets/locales.json';

// Returns localised text for UI elements
const localizedText = {
	locales: localized.locales,
	topBar: localized.topBar,
	login: localized.login,
	navigation: localized.navigation,
	pageNotFound: localized.pageNotFound
};

export default (store) => {
	store.on('@init', () => ({ localizedText }));
};
