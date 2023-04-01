import {
  DEFAULT_BP_API_ENDPOINT,
  post,
  type tGetTableRowsOutput,
} from '../../commons';
import { type tGetTableRows } from '../types';

/**
 * @name getTableRows
 * @param {tGetTableRows} params  - code, table, scope, json, limit, lowerBound, upperBound and bp api endpoint
 * @returns {Promise<tGetTableRowsOutput>} - Rows in a table.
 * @description
 * Returns rows in a table given a code, table, and a scope. Rows will return empty if there is no table available under that table, or scope.
 * @example
 * ```typescript
 * import { getTableRows } from '@ultra-alliance/ultra-sdk';
 *
 * const code = 'eosio.nft.ft';
 * const table = 'factory.a';
 * const scope = 'eosio.nft.ft';
 * const limit = 10;
 * const json = true;
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

const getTableRows = async ({
  code,
  table,
  scope,
  json,
  limit,
  lowerBound,
  upperBound,
  bpApiEndpoint,
}: tGetTableRows): Promise<tGetTableRowsOutput> =>
  post({
    path: `${bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT}/v1/chain/get_table_rows`,
    config: {},
    body: {
      code,
      limit,
      table,
      scope,
      json: json ?? true,
      lower_bound: lowerBound ?? '',
      upper_bound: upperBound ?? '',
    },
  });

export default getTableRows;
