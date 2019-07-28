import 'cross-fetch/polyfill';
import * as helpers from './helpers';
import * as localized from '../assets/locales.json';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => {
	return '/api';
});

describe('Testing helpers: ', () => {

	it('Should run trough object and find a matching properly', () => {
		let grid = null;
		helpers.forOwnProp(testUtils.mappedSizes, (v) => {
			if (v === 11) {
				grid = v;
			}
		});

		expect(grid).toEqual(11);
	});

	it('Should check locale correctly', () => {
		expect(helpers.ifFieldExistsInObject('xxx', localized.locales)).toBe(null);
		expect(helpers.ifFieldExistsInObject('rus', localized.locales)).toEqual('rus');
	});

	it('Should run mapKeys and get all keys out of object', () => {
		const keys = [];
		helpers.mapKeys(testUtils.mappedSizes, key => keys.push(key));
		expect(keys).toEqual([12, 12, 12, 11]);
	});

	it('Should run forEachCallback() and verify the result', () => {
		const arr = [1, 2, 3];
		const fn = jest.fn();

		helpers.forEachCallback(arr, value => fn(value));
		expect(fn.mock.calls.length).toBe(3);
	});

	it('Should run declOfNum() and verify results', () => {
		const endings = ['A', 'B', 'C'];
		const numbers = [1, 41, 2, 178];
		const results = [];

		for (let i = 0; i <= numbers.length; i++) {
			results.push(helpers.declOfNum(numbers[i], endings));
		}

		expect(results).toEqual(['A', 'A', 'B', 'C', 'C']);
	});
});
