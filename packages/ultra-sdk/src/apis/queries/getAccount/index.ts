import {
  DEFAULT_BP_API_ENDPOINT,
  post,
  type tGetAccountOutput,
} from '../../commons';
import { type tGetAccount } from '../types';

/**
 * @name getAccount
 * @category Ultra Queries
 * @param {tGetAccount} params - account name and bp api endpoint
 * @returns {Promise<tGetAccountOutput>} - account information
 * @description Get account information
 * @example
 * ```typescript
 * import { getAccount } from '@ultra-alliance/sdk';
 *
 * const accountName = 'ultra';
 *
 * (async () => {
 *  const result = await getAccount({
 *   accountName,
 *  bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *  console.log('result', result);
 * })();
 *
 *
 */

const getAccount = async ({
  accountName,
  bpApiEndpoint,
}: tGetAccount): Promise<tGetAccountOutput> =>
  post({
    path: `${bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT}/v1/chain/get_account`,
    body: { account_name: accountName },
    config: {},
  });

export default getAccount;
