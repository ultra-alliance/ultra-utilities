import {
  post,
  DEFAULT_BP_API_ENDPOINT,
  type tGetBlockOutput,
} from '../../commons';
import { type tGetBlock } from '../types';

/**
 * @name getBlock
 * @category Ultra Queries
 * @param {tGetBlock} params - block num or id and bp api endpoint
 * @returns {Promise<tGetAccountOutput>} - account information
 * @description Get block information
 * @example
 * ```typescript
 * import { getBlock } from '@ultra-alliance/sdk';
 *
 * const accountName = 'ultra';
 *
 * (async () => {
 *  const result = await getBlock({
 *   blockNumOrId,
 *  bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *  console.log('result', result);
 * })();
 * ```
 */

const getBlock = async ({
  blockNumOrId,
  bpApiEndpoint,
}: tGetBlock): Promise<tGetBlockOutput> =>
  post({
    path: `${bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT}/v1/chain/get_block`,
    body: { block_num_or_id: blockNumOrId },
    config: {},
  });

export default getBlock;
