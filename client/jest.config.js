module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
  moduleNameMapper: {
    '\\.svg': '@svgr/webpack'
  }
};
