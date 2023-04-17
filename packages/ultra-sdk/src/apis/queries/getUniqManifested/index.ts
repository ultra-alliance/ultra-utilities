import { getZipContent } from '../../../utilities';
import { type tUniqManifested } from '../../commons';
import getUniqDetail from '../getUniqDetail';
import { type tGetUniqManifested } from '../types';

/**
 * @name getUniqManifested - Get uniq detail and read the manifest file generating a tUniqManifested object
 * @category Ultra Queries
 * @param {tGetUniqManifested} params - uniqId and bp api endpoint
 * @returns {Promise<tUniqManifested>} - Uniq detail with manifest file
 * @example
 * ```typescript
 * import { getUniqManifested } from '@ultra-alliance/ultra-sdk';
 *
 * const uniqId = '1';
 *
 * const result = await getUniqManifested({
 *  uniqId,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

async function getUniqManifested({
  uniqId,
  bpApiEndpoint,
}: tGetUniqManifested): Promise<tUniqManifested> {
  return getUniqDetail({
    uniqId,
    bpApiEndpoint,
  })
    .then(async uniq => {
      if (!uniq) {
        throw new Error('Uniq not found');
      }

      const { manifest } = await getZipContent(uniq.meta_uris[0]);

      return {
        uniq,
        manifest,
      };
    })
    .catch(() => {
      throw new Error('Uniq not found');
    });
}

export default getUniqManifested;
