module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  coverageReporters: ['text', 'json'],
  testEnvironment: 'node',
  testRegex: [
    '.e2e-spec.ts$',
    '.test.ts$',
  ],
  testTimeout: 20000,
  watchPlugins: [
    [
      'jest-watch-suspend',
      {
        'suspend-on-start': true,
      },
    ],
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
