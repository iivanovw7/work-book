import createStore from 'storeon';

import theme from './theme';
import pages from './pages';
import locale from './locale';
import localizedText from './localizedText';

// export const store = createStore([theme, pages, locale, localizedText]);

export const store = createStore([
  theme, pages, locale, localizedText, process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);
