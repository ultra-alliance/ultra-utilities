import { type tFactory } from '../../commons';
import getTableRows from '../getTableRows';
import { type tGetFactoryDetail } from '../types';

/**
 * @name getFactoryDetail - Get uniq detail
 * @category Ultra Queries
 * @param {tGetFactoryDetail} params - uniqId and bp api endpoint
 * @returns {Promise<tFactory>} - Factory detail
 * @example
 * ```typescript
 * import { getFactoryDetail } from '@ultra-alliance/ultra-sdk';
 *
 * const factoryId = '1';
 *
 * const result = await getFactoryDetail({
 *  factoryId,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

async function getFactoryDetail({
  factoryId,
  bpApiEndpoint,
}: tGetFactoryDetail): Promise<tFactory> {
  const result = await getTableRows({
    bpApiEndpoint,
    code: 'eosio.nft.ft',
    scope: 'eosio.nft.ft',
    table: 'factory.a',
    config: {
      lowerBound: factoryId,
      upperBound: factoryId,
      limit: 1,
    },
  });

  if (!result || result.rows.length === 0) {
    throw new Error('Factory not found');
  }

  return result.rows[0] as tFactory;
}

export default getFactoryDetail;
