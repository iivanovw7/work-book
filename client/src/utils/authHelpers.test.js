import '@babel/polyfill/noConflict';
import chalk from 'chalk';
import mockAxios from 'jest-mock-axios';
import * as mocks from '../__mocks__';
import { checkUser, ifTokenExists, loginUser } from './authHelpers';
import { URL } from '../config/apiURL';

// Mocking js-cookies for testing, to run Cookies.get() function
jest.mock('js-cookie', () => ({ get: () => 'token' }));
jest.mock('../config/apiURL', () => () => '/api');
jest.mock('../config/settings', () => ({
  ...(jest.requireActual('../config/settings'))
}));

describe(`Testing [${chalk.yellow('authHelpers')}]: `, () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it(`Should check if mocked token exists in [${chalk.yellow('Cookies')}]`, () => {
    expect(ifTokenExists()).toEqual(true);
  });

  it(`Should run [${chalk.yellow('loginUser')}] and verify results`, async () => {
    const reqURL = `${URL}/auth/login`;
    const mockResponse = mocks.loginResponse;
    const catchFn = jest.fn();

    loginUser('email', 'password', 'rus', mocks.localizedText).catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(
      reqURL, {
        email: 'email',
        password: 'password'
      },
      {
        withCredentials: true
      }
    );

    mockAxios.mockResponse(mockResponse);

    expect(catchFn).not.toHaveBeenCalled();
  });

  it(`Should run [${chalk.yellow('checkUser')}] and verify results`, async () => {
    const reqURL = `${URL}/auth/login?token=token`;
    const mockResponse = mocks.loginResponse;
    const catchFn = jest.fn();

    checkUser(false).catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(reqURL, { withCredentials: true });

    mockAxios.mockResponse(mockResponse);

    expect(catchFn).not.toHaveBeenCalled();
  });
});
