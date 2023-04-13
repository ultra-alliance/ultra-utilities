/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const sharedConfig = require('../../jest.shared-config.js');

module.exports = {
  ...sharedConfig,
  displayName: 'React Ultra SDK',
  roots: ['src'],
  testEnvironment: 'jest-environment-jsdom',
};
