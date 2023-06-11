// istanbul ignore file

import { DEFAULT_BP_API_ENDPOINT, type tFactory } from '../../commons';
import { eUltraContracts, eUltraTables } from '../../constants';
import getTableRows from '../getTableRows';
import { type tUltraQuery } from '../types';

/**
 * @name getFactories - Get Factories
 * @category Ultra Queries
 * @param {tUltraQuery} params - uniqId and bp api endpoint
 * @returns {Promise<tFactory[]>} - Factory detail
 * @example
 * ```typescript
 * import { getFactories } from '@ultra-alliance/ultra-sdk';
 *
 *
 * const result = await getFactories({
 *  bpApiEndpoint: 'https://example.com',
 * config: {
 *  json: true,
 *  limit:4,
 *  reverse: true,
 * });
 *
 * console.log('result', result);
 * ```
 */

async function getFactories({
  bpApiEndpoint,
  config,
}: tUltraQuery): Promise<tFactory[]> {
  const result = await getTableRows<tFactory>({
    bpApiEndpoint: bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT,
    code: eUltraContracts.UNIQ,
    scope: eUltraContracts.UNIQ,
    table: eUltraTables.FACTORY,
    config,
  });

  if (!result || result.rows.length === 0) {
    throw new Error('Factory not found');
  }

  return result.rows;
}

export default getFactories;
