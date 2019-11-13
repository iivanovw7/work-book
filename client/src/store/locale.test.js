import 'cross-fetch/polyfill';
import chalk from 'chalk';
import createStore from 'storeon';
import locale from './locale';

jest.mock('../utils/helpers');
jest.mock('js-cookie');
jest.mock('../config/apiURL', () => () => '/api');
jest.mock('../config/settings', () => ({
  ...(jest.requireActual('../config/settings'))
}));


describe('Testing locale store: ', () => {
  it(`Should check current [${chalk.yellow('locale')}] switch it and check again`, async () => {
    const store = createStore([locale]);
    store.dispatch('changeLocale');
    expect(store.get().locale).toBe('eng');
    store.dispatch('changeLocale');
    expect(store.get().locale).toBe('rus');
  });
});
