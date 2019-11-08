module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>src/__mocks__/svgrMock.jsx',
    '\\.(ttf|eot|woff|woff2)$': '<rootDir>src/__mocks__/fileMock.js'
  }
};
