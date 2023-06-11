import { DEFAULT_BP_API_ENDPOINT, type tFactory } from '../../commons';
import { eUltraContracts, eUltraTables } from '../../constants';
import getTableRows from '../getTableRows';
import { type tGetFactory } from '../types';

/**
 * @name getFactory - Get Factory detail
 * @category Ultra Queries
 * @param {tGetFactory} params - uniqId and bp api endpoint
 * @returns {Promise<tFactory>} - Factory detail
 * @example
 * ```typescript
 * import { getFactory } from '@ultra-alliance/ultra-sdk';
 *
 * const factoryId = '1';
 *
 * const result = await getFactory({
 *  factoryId,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

async function getFactory({
  factoryId,
  bpApiEndpoint,
}: tGetFactory): Promise<tFactory> {
  const result = await getTableRows({
    bpApiEndpoint: bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT,
    code: eUltraContracts.UNIQ,
    scope: eUltraContracts.UNIQ,
    table: eUltraTables.FACTORY,
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

export default getFactory;
