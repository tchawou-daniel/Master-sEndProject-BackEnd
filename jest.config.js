module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'apps',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageReporters: ['text', 'json'],
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  // testRegex: ['.e2e-spec.ts$', '.test.ts$'],
  testTimeout: 20000,
  watchPlugins: [
    [
      'jest-watch-suspend',
      {
        'suspend-on-start': true,
      },
    ],
  ],
  /*   transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  watchPlugins: [
    // default
    'jest-watch-suspend',
    // configure
    [
      'jest-watch-suspend',
      {
        // override key press
        key: 's',
        // override prompt
        prompt: 'suspend watch mode',
        // starts in suspend mode
        'suspend-on-start': true,
      },
    ],
  ], */
};
