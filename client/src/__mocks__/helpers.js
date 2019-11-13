import * as constants from '../constants';

export const convertTimestampOptions = [
  [1305593400, constants.TIMESTAMP_UNITS.MS, '{YYYY} MM-DD SSS [Z] A'],
  [1305593400, constants.TIMESTAMP_UNITS.SEC, '{YYYY} MM-DD SSS [Z] A'],
  [undefined, constants.TIMESTAMP_UNITS.MS, 'MMMM DD, YYYY'],
  [null, 'units', null]
];

export const convertTimestampExpected = [
  '{1970} 01-16 000 Z AM',
  '{2011} 05-17 000 Z AM',
  'Invalid Date',
  'Invalid Date'
];
