import 'babel-polyfill';
import 'cross-fetch/polyfill';
import chalk from 'chalk';
import createStore from 'storeon';
import theme from './theme';

jest.mock('../utils/helpers');
jest.mock('js-cookie');
jest.mock('../config/apiURL', () => () => '/api');
jest.mock('../config/settings', () => ({
  ...(jest.requireActual('../config/settings'))
}));
jest.mock('../assets/fonts/inconsolatalgc.ttf');
jest.mock('../assets/fonts/Nunito-Regular.ttf');
jest.mock('../assets/fonts/Nunito-Regular.woff');

describe('Testing theme store: ', () => {
  it(`Should check current [${chalk.yellow('theme')}] switch it and check again`, async () => {
    const store = createStore([theme]);
    store.dispatch('switch');
    expect(store.get().theme).toBe('dark');
    store.dispatch('switch');
    expect(store.get().theme).toBe('light');
  });
});
