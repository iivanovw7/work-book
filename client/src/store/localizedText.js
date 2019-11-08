import * as localized from '../assets/locales/locales.json';

// Returns localised text for UI elements
const localizedText = {
  locales: localized.locales,
  topBar: localized.topBar,
  login: localized.login,
  navigation: localized.navigation,
  pageNotFound: localized.pageNotFound,
  posts: localized.posts,
  search: localized.search
};

export default (store) => {
  store.on('@init', () => ({ localizedText }));
};
