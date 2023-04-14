/**
 * `tLocalisationProvider` is a type for the props of the `LocalisationProvider` component. It includes a `children` property.
 *
 * @category Providers
 */

export type tLocalisationProvider = {
  children: React.ReactNode;
};

/**
 * `tUltraProvider` is a type for the props of the `UltraProvider` component. It includes `children` and `bpApiEndpoint` properties.
 *
 * @category Providers
 */

export type tUltraProvider = {
  children: React.ReactNode;
  bpApiEndpoint: string;
};
