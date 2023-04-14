import {
  DEFAULT_BP_API_ENDPOINT,
  post,
  type tGetAbiOutput,
} from '../../commons';
import { type tGetAbi } from '../types';

/**
 * @name getAbi
 * @category Ultra Queries
 * @param {tGetAbi} params -account name and bp api endpoint
 * @returns {Promise<tGetAbiOutput>} - abi information
 * @description Returns information about a smart contract’s available actions, tables, etc.
 * @example
 * ```typescript
 * import { getBlock } from '@ultra-alliance/ultra-sdk';
 *
 * const accountName = 'ultra';
 *
 * (async () => {
 *  const result = await getBlock({
 *   blockNumOrId,
 *  bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *  console.log('result', result);
 * })();
 * ```
 */

const getAbi = async ({
  accountName,
  bpApiEndpoint,
}: tGetAbi): Promise<tGetAbiOutput> =>
  post({
    path: `${bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT}/v1/chain/get_abi`,
    body: { account_name: accountName },
    config: {},
  });

export default getAbi;
