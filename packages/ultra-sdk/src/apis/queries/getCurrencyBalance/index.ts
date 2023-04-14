import {
  DEFAULT_BP_API_ENDPOINT,
  post,
  type tGetCurrencyBalanceOutput,
} from '../../commons';
import { type tGetCurrencyBalance } from '../types';

/**
 * @name getCurrencyBalance
 * @category Ultra Queries
 * @param {tGetCurrencyBalance} params - code, account, symbol and bp api endpoint
 * @returns {Promise<tGetAbiOutput>} - get currency balance
 * @description Returns the current currency balance for a given token contract, account, and a token symbol.
 * @example
 * ```typescript
 * import { getCurrencyBalance } from '@ultra-alliance/ultra-sdk';
 *
 * const result = await getBlock({
 *      account: 'ultra.nft.ft',
 *      code: 'eosio.token',
 *      symbol: 'UOS',
 *      bpApiEndpoint: 'https://api.ultrain.io',
 * });
 * console.log('result', result);
 * ```
 */

const getCurrencyBalance = async ({
  code,
  account,
  symbol,
  bpApiEndpoint,
}: tGetCurrencyBalance): Promise<tGetCurrencyBalanceOutput> =>
  post({
    path: `${
      bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT
    }/v1/chain/get_currency_balance`,
    body: { code, account, symbol },
    config: {},
  });

export default getCurrencyBalance;
