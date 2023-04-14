import {
  DEFAULT_BP_API_ENDPOINT,
  get,
  type tGetInfoOutput,
} from '../../commons';
import { type tGetInfo } from '../types';

/**
 * @name getInfo
 * @category Ultra Queries
 * @param {tGetInfo} params  - bp api endpoint
 * @returns {Promise<tGetInfoOutput>} - some chain information
 * @description
 * A good way to get information about the chain including a unique identifier for the chain, current head block number, etc.
 * @example
 * ```typescript
 * import { getInfo } from '@ultra-alliance/ultra-sdk';
 *
 * const result = await getInfo({
 *      bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

const getInfo = async ({ bpApiEndpoint }: tGetInfo): Promise<tGetInfoOutput> =>
  get({
    path: `${bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT}/v1/chain/get_info`,
    config: {},
  });

export default getInfo;
