// istanbul ignore file

/**
 * Represents the images and gallery of a product.
 *
 * @category Metadata
 */
export type tMedia = {
  /**
   * URLs of the product images in different sizes.
   */
  images: {
    product?: string;
    square?: string;
    hero?: string;
  };
  /**
   * URLs of the images in the product gallery.
   */
  gallery: string[];
};

/**
 * Represents the metadata of a product manifest.
 *
 * @category Metadata
 */
export type tManifest = {
  /**
   * The version of the product specification.
   */
  specVersion: string;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * The sub-name of the product.
   */
  subName: string;
  /**
   * The description of the product.
   */
  description: string;
  /**
   * The type of the product.
   */
  type: string;
  /**
   * The media of the product, such as images and gallery.
   */
  media: tMedia;
  /**
   * The default locale of the product.
   */
  defaultLocale: string;
};

/**
 * @category Metadata
 * @param {string} url - URL of the ZIP file
 * @returns {Promise<{ manifest: tManifest }>} - manifest.json and image urls
 * @description
 * Retrieve manifest.json and image urls from a ZIP file
 */

export type tGetZipContent = {
  url: string;
  contentToUnzip: {
    product?: boolean;
    square?: boolean;
    hero?: boolean;
    gallery?: boolean;
  };
};
