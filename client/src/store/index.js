import createStore from 'storeon';
import persistState from '@storeon/localstorage';

import theme from './theme';
import pages from './pages';
import locale from './locale';
import localizedText from './localizedText';
import search from './search';

// export const store = createStore([theme, pages, locale, localizedText]);

export const store = createStore([
  search, theme, pages, locale, localizedText, persistState(['search']), process.env.NODE_ENV !== 'production'
    && require('storeon/devtools')
]);
