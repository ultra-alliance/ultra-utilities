import { DEFAULT_BP_API_ENDPOINT, type tGetAvatarOutput } from '../../commons';
import { eUltraContracts, eUltraTables } from '../../constants';
import getTableRows from '../getTableRows';
import { type tGetAvatar } from '../types';

/**
 * @name geAvatart
 * @category Ultra Queries
 * @param {tGetAvatar} params - wallet account and bp api endpoint
 * @returns {Promise<tGetAccountOutput>} - avatar nft id
 * @description Get the avatar nft id of the account
 * @example
 * ```typescript
 * import {  getAvatar } from '@ultra-alliance/sdk';
 *
 * const accountName = 'ultra';
 *
 * (async () => {
 *  const result = await getAvatar({
 *    account: accountName,
 *    bpApiEndpoint: 'https://api.ultrain.io',
 *  });
 * })();
 * ```
 */

const getAvatar = async ({
  account,
  bpApiEndpoint,
  config,
}: tGetAvatar): Promise<tGetAvatarOutput> =>
  getTableRows<{ nft_id: number }>({
    code: eUltraContracts.AVATAR,
    scope: eUltraContracts.AVATAR,
    table: eUltraTables.ACCOUNT_AVATAR,
    bpApiEndpoint: bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT,
    config: {
      ...config,
      limit: 1,
      lowerBound: account,
      upperBound: account,
    },
  });

export default getAvatar;
