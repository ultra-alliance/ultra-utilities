import JSZip from 'jszip';
import { type tManifest } from '../types';

/**
 * @category Utilities
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
 * const { manifest } = await getZipContent(url);
 * ```
 */

async function getZipContent(url: string): Promise<{
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
  if (productImage) {
    const productImageFile = zip.file(productImage);
    if (productImageFile) {
      const productImageUrl = URL.createObjectURL(
        await productImageFile.async('blob'),
      );
      if (productImageUrl && manifest?.media?.images?.product) {
        manifest.media.images.product = productImageUrl;
      }
    }
  }

  if (squareImage) {
    const squareImageFile = zip.file(squareImage);
    if (squareImageFile) {
      const squareImageUrl = URL.createObjectURL(
        await squareImageFile.async('blob'),
      );
      if (squareImageUrl && manifest.media?.images?.square) {
        manifest.media.images.square = squareImageUrl;
      }
    }
  }

  if (heroImage) {
    const heroImageFile = zip.file(heroImage);
    if (heroImageFile) {
      const heroImageUrl = URL.createObjectURL(
        await heroImageFile.async('blob'),
      );
      if (heroImageUrl && manifest.media?.images?.hero) {
        manifest.media.images.hero = heroImageUrl;
      }
    }
  }

  const galleryUrls = await Promise.all(
    galleryImages.map(async galleryImage => {
      const galleryImageFile = zip.file(galleryImage);
      if (galleryImageFile) {
        const galleryImageUrl = URL.createObjectURL(
          await galleryImageFile.async('blob'),
        );
        if (galleryImageUrl) {
          return galleryImageUrl;
        }
      }

      return '';
    }),
  );

  manifest.media.gallery = galleryUrls;

  return { manifest };
}

export default getZipContent;
