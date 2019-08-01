import Cookies from 'js-cookie';
import * as utils from '../utils';

// Returns default locale setting, and stores new locale in cookies
export default (store) => {
  store.on('@init', () => ({ locale: utils.setLocale() }));
  store.on('changeLocale', ({ locale }) => {
    if (locale === 'eng') {
      Cookies.set('locale', 'rus');
      return ({ locale: 'rus' });
    }
    Cookies.set('locale', 'eng');
    return ({ locale: 'eng' });
  });
};
