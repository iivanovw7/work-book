/* eslint no-underscore-dangle: 0 */

export default async () => {
	await global.__MONGOD__.stop();
};
