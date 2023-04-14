/**
 * The `tUltraColors` type is used to define a set of ultra colors
 * @category Theme
 */
export type tUltraColors = {
  /**
   * Lilac Luster color
   */
  lilacLuster: string;
  /**
   * Orchid Haze color
   */
  orchidHaze: string;
  /**
   * Royal Amethyst color
   */
  royalAmethyst: string;
  /**
   * Irish Enchantment color
   */
  irishEnchantment: string;
  /**
   * Midnight Ashes color
   */
  midnightAshes: string;
};

/**
 * The `tUltraTheme` type is used to define an ultra theme object.
 * @category Theme
 */
export type tUltraTheme = {
  /**
   * Dimensions object for the theme
   */
  dimensions: {
    /**
     * Width of the drawer
     */
    drawerWidth: number;
  };
  /**
   * Ultra colors for the theme
   */
  ultra: tUltraColors;
};
