import { type tTokenA, type tGetUniqOwnedOutput } from '../../commons';
import { eUltraContracts, eUltraTables } from '../../constants';
import getTableRows from '../getTableRows';
import { type tGetUniqOwned } from '../types';

/**
 * @function getUniqsOwned - Get all uniqs owned by an account
 * @category Ultra Queries
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
  config,
}: tGetUniqOwned): Promise<tGetUniqOwnedOutput> {
  return getTableRows<tTokenA>({
    bpApiEndpoint,
    code: eUltraContracts.UNIQ,
    scope: account,
    table: eUltraTables.UNIQS_OWNED,
    config: {
      ...config,
    },
  });
}

export default getUniqsOwned;
