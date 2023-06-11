import { type tListedUniq, type tGetTableRowsOutput } from '../../commons';
import { eUltraContracts, eUltraTables } from '../../constants';
import getTableRows from '../getTableRows';
import { type tUltraQuery } from '../types';

/**
 * @name getListedUniqs - Get all listed uniqs
 * @category Ultra Queries
 * @param {string} bpApiEndpoint - BP API endpoint
 * @returns {Promise<tGetListedUniqsOutput>} - Listed uniqs
 * @description
 * Returns all listed uniqs
 * @example
 * ```typescript
 * import { getListedUniqs } from '@ultra-alliance/ultra-sdk';
 *
 * const result = await getListedUniqs({})
 * console.log('result', result);
 * ```
 **/

async function getListedUniqs(
  props: tUltraQuery,
): Promise<tGetTableRowsOutput<tListedUniq>> {
  return getTableRows<tListedUniq>({
    bpApiEndpoint: props.bpApiEndpoint,
    code: eUltraContracts.UNIQ,
    scope: eUltraContracts.UNIQ,
    table: eUltraTables.RESALE,
    config: {
      ...props.config,
    },
  });
}

export default getListedUniqs;
