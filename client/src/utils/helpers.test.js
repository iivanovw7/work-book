import * as helpers from './helpers';
import * as localized from '../assets/locales.json';
import * as testUtils from '../testUtils';

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
});
