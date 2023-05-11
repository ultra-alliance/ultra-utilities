// istanbul ignore file

import {
  DEFAULT_BP_API_ENDPOINT,
  post,
  type tGetTableRowsOutput,
} from '../../commons';
import { type tGetTableRows } from '../types';

/**
 * @name getTableRows
 * @category Ultra Queries
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

const getTableRows = async <TRow>({
  code,
  table,
  scope,
  bpApiEndpoint,
  config,
}: tGetTableRows): Promise<tGetTableRowsOutput<TRow>> => {
  const body: Record<string, any> = {
    code,
    table,
    scope,
    json: config?.json ?? true,
    reverse: config?.reverse ?? false,
    limit: config?.limit ?? 1000,
    upper_bound: config?.upperBound,
    lower_bound: config?.lowerBound,
  };

  if (config?.index_position !== undefined) {
    body.index_position = config.index_position;
  }

  if (config?.show_payer !== undefined) {
    body.show_payer = config.show_payer;
  }

  if (config?.key_type !== undefined) {
    body.key_type = config.key_type;
  }

  if (config?.key !== undefined) {
    body.key = config.key;
  }

  return post({
    path: `${bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT}/v1/chain/get_table_rows`,
    config: {},
    body,
  });
};

export default getTableRows;
