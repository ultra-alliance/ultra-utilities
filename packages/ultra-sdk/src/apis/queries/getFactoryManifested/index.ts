import { getZipContent } from '../../../utilities';
import { type tFactoryManifested } from '../../commons';
import getFactory from '../getFactory';
import { type tGetFactoryManifested } from '../types';

/**
 * @name getFactoryManifested - Get factory detail and read the manifest file generating a tFactoryManifested object
 * @category Ultra Queries
 * @param {tGetFactoryManifested} params - factoryId and bp api endpoint
 * @returns {Promise<tFactoryManifested>} - Factory detail with manifest file
 * @example
 * ```typescript
 * import { getFactoryManifested } from '@ultra-alliance/ultra-sdk';
 *
 * const factoryId = '1';
 *
 * const result = await getFactoryManifested({
 *  factoryId,
 * bpApiEndpoint: 'https://api.ultrain.io',
 * });
 *
 * console.log('result', result);
 * ```
 */

async function getFactoryManifested({
  factoryId,
  contentToUnzip,
  bpApiEndpoint,
}: tGetFactoryManifested): Promise<tFactoryManifested> {
  return getFactory({
    factoryId,
    bpApiEndpoint,
  })
    .then(async data => {
      if (!data) {
        throw new Error('Factory not found');
      }

      const { manifest } = await getZipContent({
        url: data.factory_uri,
        contentToUnzip: {
          ...contentToUnzip,
        },
      });
      return {
        data,
        manifest,
      };
    })
    .catch(() => {
      throw new Error('Factory not found');
    });
}

export default getFactoryManifested;
