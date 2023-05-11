import {
  DEFAULT_BP_API_ENDPOINT,
  post,
  type tGetTableByScopeOutput,
} from '../../commons';
import { type tGetTableByScope } from '../types';

/**
 * @name getTableByScope
 * @category Ultra Queries
 * @param {tGetTableByScope} params  - code, limit, lowerBound, upperBound and bp api endpoint
 * @returns {Promise<tGetInfoOutput>} - Tables available and their scopes.
 * @description
 * Returns tables available and their given scopes for a specific contract account name. Useful for seeing what entries made it into a table and the amount of rows in that table.
 * A good way to get information about the chain including a unique identifier for the chain, current head block number, etc.
 * @example
 * ```typescript
 * import { getTableByScope } from '@ultra-alliance/ultra-sdk';
 *
 * const code = 'ultra.nft.ft';
 * const limit = 10;
 *
 * const result = await getTableByScope({
 *    code,
 *    limit,
 *    bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

const getTableByScope = async ({
  code,
  bpApiEndpoint,
  config,
}: tGetTableByScope): Promise<tGetTableByScopeOutput> =>
  post({
    path: `${
      bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT
    }/v1/chain/get_table_by_scope`,
    config: {},
    body: {
      code,
      limit: config?.limit ?? 1000,
      ...config,
    },
  });

export default getTableByScope;
