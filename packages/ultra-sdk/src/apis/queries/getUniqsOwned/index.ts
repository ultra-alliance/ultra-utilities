import { type tGetUniqOwnedOutput } from '../../commons';
import getTableRows from '../getTableRows';
import { type tGetUniqOwned } from '../types';

/*
 * @function getUniqsOwned - Get all uniqs owned by an account
 * @param {tGetUniqOwned} params - account name and bp api endpoint
 * @returns {Promise<tGetUniqOwnedOutput>} - uniqs owned by an account
 * @description Returns all uniqs owned by an account
 * @example
 * ```typescript
 * import { getUniqsOwned } from '@ultra-alliance/ultra-sdk';
 *
 * const account = 'ultra';
 *
 * (async () => {
 * const result = await getUniqsOwned({
 *  account,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 * console.log('result', result);
 * })();
 * ```
 */

async function getUniqsOwned({
  account,
  bpApiEndpoint,
}: tGetUniqOwned): Promise<tGetUniqOwnedOutput> {
  return getTableRows({
    bpApiEndpoint,
    code: 'eosio.nft.ft',
    scope: account,
    table: 'token.a',
    limit: 1000,
  }) as unknown as Promise<tGetUniqOwnedOutput>;
}

export default getUniqsOwned;
