module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['packages/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  modulePathIgnorePatterns: ['node_modules'],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
};
