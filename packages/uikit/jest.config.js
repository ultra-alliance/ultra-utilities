/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const sharedConfig = require('../../jest.shared-config.js');

module.exports = {
  ...sharedConfig,
  displayName: 'Ultra Ui Kit',
  roots: ['src'],
  testEnvironment: 'jest-environment-jsdom',
};
