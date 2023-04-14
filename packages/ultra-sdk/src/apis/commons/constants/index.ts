/**
 * @category Ultra Queries
 * @description
 * The default endpoint for the block producers API.
 */

export const DEFAULT_BP_API_ENDPOINT = 'https://api.ultra.eossweden.org';

/**
 * @category Ultra Queries
 * @description
 * The endpoints for the block producers API available in mainnet and testnet.
 */

export const BP_API_ENDPOINTS = {
  main: [
    'http://ultra.api.eosnation.io',
    'https://ultra.eosrio.io',
    'https://api.ultra.cryptolions.io',
    'https://ultra-api.eoseoul.io',
    'https://uos.eosusa.news',
    DEFAULT_BP_API_ENDPOINT,
  ],
  test: [
    'https://ultratest-api.eoseoul.io',
    'http://ultratest.api.eosnation.io',
    'https://testnet.ultra.eosrio.io',
    'https://test.uos.eosusa.news',
    'https://api.ultra-testnet.cryptolions.io',
    'https://api.testnet.ultra.eossweden.org',
  ],
};
