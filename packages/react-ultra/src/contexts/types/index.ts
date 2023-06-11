/**
 * `tLocalisationContext` is a type representing the shape of the Localisation Context value. It includes the `baseCurrency` and `baseLanguage`, as well as functions to update the selected currency and language.
 *
 * @category Context
 */
import {
  type tUltra,
  type tAuth,
  type tLoginOptions,
  type tLogoutOptions,
  type tUltraAccount,
  type tMarketPrices,
  type tChainName,
  type tChain,
} from '@ultra-alliance/ultra-sdk';
import { type tCurrency, type tLanguage } from '../../models';

/**
 * `tLocalisationContext` is a type representing the shape of the Localisation Context value. It includes the `baseCurrency` and `baseLanguage`, as well as functions to update the selected currency and language.
 * @category Context
 */
export type tLocalisationContext = {
  /**
   * The base currency selected.
   */
  baseCurrency: tCurrency;

  /**
   * The base language selected.
   */
  baseLanguage: tLanguage;

  /**
   * A function to update the selected language.
   *
   * @param language - The new language to be selected.
   */
  updateLanguage: (language: tLanguage) => void;

  /**
   * A function to update the selected currency.
   *
   * @param currency - The new currency to be selected.
   */
  updateCurrency: (currency: tCurrency) => void;
};

/**
 * `tUltraContext` is a type representing the shape of the Ultra Context value. It includes the `ultra`, `auth`, and `account` states, as well as functions to log in, log out, and update the BP API endpoint.
 *
 * @category Context
 */
export type tUltraContext = {
  /**
   * The `tUltra` object.
   */
  ultra: tUltra | undefined;

  /**
   * The `tAuth` object.
   */
  auth: tAuth;

  /**
   * The `tUltraAccount` object.
   */
  account: tUltraAccount | undefined;

  /**
   * A function to log in.
   *
   * @param accountName - The account name to log in with.
   * @param options - The `tLoginOptions` object.
   *
   * @returns A promise that resolves with the `tUltraAccount` object or `undefined`.
   */
  login: (options: tLoginOptions) => Promise<tUltraAccount | undefined>;

  /**
   * A function to log out.
   *
   * @param options - The `tLogoutOptions` object.
   *
   * @returns A promise that resolves with `void`.
   */
  logout: (options: tLogoutOptions) => Promise<void>;

  /**
   * A boolean value indicating whether the user is authenticated.
   */
  isAuthenticated: boolean;

  /**
   * A boolean value indicating whether the user is unauthenticated.
   */
  isUnauthenticated: boolean;

  /**
   * A boolean value indicating whether the authentication process is ongoing.
   */
  isAuthenticating: boolean;

  /**
   * A boolean value indicating whether an authentication error has occurred.
   */
  hasAuthError: boolean;

  /**
   * A boolean value indicating whether the user is currently logging out.
   */
  isLoggingOut: boolean;

  /**
   * A boolean value indicating whether the authentication state is undefined.
   */
  isAuthUndefined: boolean;

  /**
   * A boolean value indicating whether the user has Ultra Wallet installed.
   */
  isWalletInstalled: boolean;

  /**
   * the market prices
   */
  marketPrices: tMarketPrices;

  chain: tChain | undefined;

  refreshMarketPrices: () => Promise<tMarketPrices>;

  refreshAccount: () => Promise<tUltraAccount | undefined>;

  changeChain: (chainName: tChainName) => Promise<tChain | undefined>;
};
