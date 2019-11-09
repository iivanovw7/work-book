import 'cross-fetch/polyfill';
import chalk from 'chalk';
import * as helpers from './helpers';
import * as localized from '../assets/locales/locales.json';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');

describe('Testing helpers: ', () => {
  it(`Should run [${chalk.yellow('forOwnProp')}] trough object and find a matching properly`, () => {
    let grid = null;
    helpers.forOwnProp(testUtils.mappedSizes, (v) => {
      if (v === 11) {
        grid = v;
      }
    });

    expect(grid).toEqual(11);
  });

  it(`Should check [${chalk.yellow('locale')}] correctly`, () => {
    expect(helpers.ifFieldExistsInObject('xxx', localized.locales)).toBe(null);
    expect(helpers.ifFieldExistsInObject('rus', localized.locales)).toEqual('rus');
  });

  it(`Should run [${chalk.yellow('mapKeys')}] and get all keys out of object`, () => {
    const keys = [];
    helpers.mapKeys(testUtils.mappedSizes, key => keys.push(key));
    expect(keys).toEqual([12, 12, 12, 11]);
  });

  it(`Should run [${chalk.yellow('forEachCallback')}] and verify the result`, () => {
    const arr = [1, 2, 3];
    const fn = jest.fn();

    helpers.forEachCallback(arr, value => fn(value));
    expect(fn.mock.calls.length).toBe(3);
  });

  it(`Should run [${chalk.yellow('declOfNum')}] and verify results`, () => {
    const endings = ['A', 'B', 'C'];
    const numbers = [1, 41, 2, 178];
    const results = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= numbers.length; i++) {
      results.push(helpers.declOfNum(numbers[i], endings));
    }

    expect(results).toEqual(['A', 'A', 'B', 'C', 'C']);
  });

  it(`Should run [${chalk.yellow('fromEstimationEnding')}] with minutes numbers and verify results`, () => {
    const text = localized.posts.estimates;

    expect(helpers.fromEstimationEnding(0.2, 'eng')).toBe(text.less.eng);
    expect(helpers.fromEstimationEnding(2, 'eng')).toBe(text.few.eng);
    expect(helpers.fromEstimationEnding(224, 'eng')).toBe(text.many.eng);
  });

  it(`Should run [${chalk.yellow('calculateReadingTime')}] with 0 text length and verify results`, () => {
    expect(helpers.calculateReadingTime(0, 'eng')).toEqual({
      minutes: 0,
      ending: helpers.fromEstimationEnding(0, 'eng')
    });
  });

});
