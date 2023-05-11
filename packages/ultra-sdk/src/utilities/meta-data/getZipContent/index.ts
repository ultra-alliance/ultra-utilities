// istanbul ignore file

import JSZip from 'jszip';
import { type tGetZipContent, type tManifest } from '../types';

/**
 * @category Metadata
 * @param {string} url - URL of the ZIP file
 * @returns {Promise<{ manifest: tManifest }>} - manifest.json and image urls
 * @description
 * Retrieve manifest.json and image urls from a ZIP file
 * @example
 * ```typescript
 * import { getZipContent } from '@ultra-alliance/ultra-sdk';
 *
 * const url = 'https://example.com/zip-file.zip';
 *
 * const { manifest } = await getZipContent({
 *  url,
 *  {
 *    product: true,
 *  }
 * });
 * ```
 */

async function getZipContent({
  url,
  contentToUnzip: { product, square, hero, gallery },
}: tGetZipContent): Promise<{
  manifest: tManifest;
}> {
  const response = await fetch(url);
  const blob = await response.blob();
  const zip = await JSZip.loadAsync(blob);

  // Retrieve manifest.json
  const manifestJson = await zip.file('manifest.json')?.async('text');
  if (!manifestJson) {
    throw new Error('manifest.json not found in ZIP file');
  }

  // Parse manifest.json to get image and text paths
  const manifest = JSON.parse(manifestJson) as tManifest;
  const { media } = manifest;
  const { images } = media;
  const productImage = images?.product;
  const squareImage = images?.square;
  const heroImage = images?.hero;
  const galleryImages = media?.gallery ?? [];

  // Retrieve image urls
  const retrieveImage = async (imageName: string) => {
    const imageFile = zip.file(imageName);
    if (imageFile) {
      const imageUrl = URL.createObjectURL(await imageFile.async('blob'));
      return imageUrl;
    }

    return '';
  };

  // Retrieve image urls concurrently
  const imagePromises = [];

  if (product && productImage) {
    imagePromises.push(
      retrieveImage(productImage)
        .then(url => {
          manifest.media.images.product = url;
        })
        .catch(() => {
          manifest.media.images.product = undefined;
        }),
    );
  }

  if (square && squareImage) {
    imagePromises.push(
      retrieveImage(squareImage)
        .then(url => {
          manifest.media.images.square = url;
        })
        .catch(() => {
          manifest.media.images.square = undefined;
        }),
    );
  }

  if (hero && heroImage) {
    imagePromises.push(
      retrieveImage(heroImage)
        .then(url => {
          manifest.media.images.hero = url;
        })
        .catch(() => {
          manifest.media.images.hero = undefined;
        }),
    );
  }

  if (gallery) {
    imagePromises.push(
      Promise.all(
        galleryImages.map(async galleryImage => retrieveImage(galleryImage)),
      )
        .then(galleryUrls => {
          manifest.media.gallery = galleryUrls;
        })
        .catch(() => {
          manifest.media.gallery = [];
        }),
    );
  }

  await Promise.all(imagePromises);

  if (!product) manifest.media.images.product = undefined;
  if (!square) manifest.media.images.square = undefined;
  if (!hero) manifest.media.images.hero = undefined;
  if (!gallery) manifest.media.gallery = [];

  return { manifest };
}

export default getZipContent;
