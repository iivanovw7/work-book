import '@babel/polyfill/noConflict';
import chalk from 'chalk';
import request from 'supertest';
import { app } from '../app';

describe(`Checking [${chalk.yellow('Static files routes')}]: `, () => {
  it(`Check expect to receive [${chalk.yellow('Favicon')}]`, async (done) => {
    request(app)
      .get('/favicon.ico')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('image/x-icon');
        done();
      });
  });
  it(`Check expect to receive [${chalk.yellow('Logo')}]`, async (done) => {
    request(app)
      .get('/logo.png')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('image/png');
        done();
      });
  });
});
