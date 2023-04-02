import { type tUniq } from '../../commons';
import getTableRows from '../getTableRows';
import { type tGetUniqDetail } from '../types';

/**
 * @name getUniqDetail - Get uniq detail
 * @param {tGetUniqDetail} params - uniqId and bp api endpoint
 * @returns {Promise<tUniq>} - Uniq detail
 * @example
 * ```typescript
 * import { getUniqDetail } from '@ultra-alliance/ultra-sdk';
 *
 * const uniqId = '1';
 *
 * const result = await getUniqDetail({
 *  uniqId,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

async function getUniqDetail({
  uniqId,
  bpApiEndpoint,
}: tGetUniqDetail): Promise<tUniq> {
  const result = await getTableRows({
    bpApiEndpoint,
    code: 'eosio.nft.ft',
    scope: 'eosio.nft.ft',
    table: 'factory.a',
    lowerBound: uniqId,
    upperBound: uniqId,
    limit: 1000,
  });
  console.log('result', result);

  if (result?.rows?.length === 0) {
    throw new Error('Uniq not found');
  }

  return result.rows[0] as tUniq;
}

export default getUniqDetail;
