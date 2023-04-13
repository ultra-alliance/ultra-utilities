export type tMedia = {
  images: {
    product: string;
    square: string;
    hero: string;
  };
  gallery: string[];
};

export type tManifest = {
  specVersion: string;
  name: string;
  subName: string;
  description: string;
  type: string;
  media: tMedia;
  defaultLocale: string;
};
