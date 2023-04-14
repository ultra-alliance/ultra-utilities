import { type tGetListedUniqsOutput } from '../../commons';
import getTableRows from '../getTableRows';

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
  bpApiEndpoint?: string,
): Promise<tGetListedUniqsOutput> {
  return getTableRows({
    bpApiEndpoint,
    code: 'eosio.nft.ft',
    scope: 'eosio.nft.ft',
    table: 'resale.a',
    json: true,
    limit: 1000,
  }) as unknown as Promise<tGetListedUniqsOutput>;
}

export default getListedUniqs;
