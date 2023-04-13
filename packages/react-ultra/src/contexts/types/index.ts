import {
  type tGetAccountOutput,
  type tUltra,
  type tAuth,
  type tLoginOptions,
  type tLogoutOptions,
} from '@ultra-alliance/ultra-sdk';
import { type tCurrency, type tLanguage } from '../../models';

export type tLocalisationContext = {
  baseCurrency: tCurrency;
  baseLanguage: tLanguage;
  updateLanguage: (language: tLanguage) => void;
  updateCurrency: (currency: tCurrency) => void;
};

export type tUltraContext = {
  ultra: tUltra | undefined;
  auth: tAuth;
  account: tGetAccountOutput | undefined;
  login: (
    accountName: string,
    { throwOnError, onError, onSuccess, onComplete }: tLoginOptions,
  ) => Promise<tGetAccountOutput | undefined>;
  logout: (options: tLogoutOptions) => Promise<void>;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  isAuthenticating: boolean;
  hasAuthError: boolean;
  isLoggingOut: boolean;
  isAuthUndefined: boolean;
  updateBpApiEndpoint: (bpApiEndpoint: string) => void;
};
