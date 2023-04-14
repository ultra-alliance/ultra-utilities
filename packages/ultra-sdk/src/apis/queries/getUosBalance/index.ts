import { type tGetCurrencyBalanceOutput } from '../../commons';
import getCurrencyBalance from '../getCurrencyBalance';
import { type tGetUosBalance } from '../types';

/**
 * @name getUosBalance (query) - Get the balance of UOS for a given account
 * @category Ultra Queries
 * @param {string} account - The account to get the balance for
 * @param {string} bpApiEndpoint - The API endpoint of the blockchain provider
 * @returns {Promise<tGetCurrencyBalanceOutput>} - The balance of UOS for the given account
 * @description
 * Returns the balance of UOS for a given account
 * @example
 * ```typescript
 * import { getUosBalance } from '@ultra-alliance/ultra-sdk';
 *
 * const account = 'ultra';
 *
 * (async () => {
 * const result = await getUosBalance({
 *  account,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 * console.log('result', result);
 * })();
 * ```
 */

async function getUosBalance({
  account,
  bpApiEndpoint,
}: tGetUosBalance): Promise<tGetCurrencyBalanceOutput> {
  return getCurrencyBalance({
    code: 'eosio.token',
    account,
    symbol: 'UOS',
    bpApiEndpoint,
  });
}

export default getUosBalance;
