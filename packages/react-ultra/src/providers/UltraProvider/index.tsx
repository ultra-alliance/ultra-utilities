/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// istanbul ignore file

import {
  type tUltra,
  type tAuth,
  type tLogoutOptions,
  type tLoginOptions,
  type tMarketPrices,
  eAuthState,
  Ultra,
  INITIAL_AUTH,
  type tUltraAccount,
  getMarketPrices,
} from '@ultra-alliance/ultra-sdk';
import React from 'react';
import { UltraContext } from '../../contexts';
import LocalisationProvider from '../LocalisationProvider';
import { type tUltraProvider } from '../types';
/**
 * The `UltraProvider` component provides authentication and account management functionality using the Ultra SDK
 * @category Providers
 * @param children The child components to wrap with the provider.
 * @param bpApiEndpoint The base URL for the Block Producer API endpoint.
 * @returns A React component that provides an `UltraContext` containing the Ultra SDK object, authentication state, and related methods.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ultra: any;
  }
}

const UltraProvider = ({ children, bpApiEndpoint }: tUltraProvider) => {
  const [ultra, _setUltra] = React.useState<tUltra | undefined>(
    new Ultra({
      bpApiEndpoint,
    }),
  );
  const [auth, setAuth] = React.useState<tAuth>(INITIAL_AUTH);
  const [account, setAccount] = React.useState<tUltraAccount | undefined>(
    undefined,
  );
  const [marketPrices, setMarketPrices] =
    React.useState<tMarketPrices>(undefined);

  const refreshMarketPrices =
    React.useCallback(async (): Promise<tMarketPrices> => {
      try {
        const res = await getMarketPrices();
        setMarketPrices(res);
        return marketPrices;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }, [ultra?.account]);

  const refreshAccount = React.useCallback(async (): Promise<
    tUltraAccount | undefined
  > => {
    try {
      const account = await ultra?.account.refetchAccountData();
      if (!account) {
        throw new Error('Account not found');
      }

      setAccount(account);
      return account;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [ultra]);

  const login = React.useCallback(
    async ({
      throwOnError,
      onError,
      onSuccess,
      onComplete,
    }: tLoginOptions = {}): Promise<tUltraAccount | undefined> => {
      setAuth({
        state: eAuthState.AUTHENTICATING,
        error: null,
      });
      try {
        const account = await ultra?.account?.connect();

        if (!account) {
          throw new Error('Account not found');
        }

        localStorage.setItem('eagerlyConnection', 'true');
        setAuth({
          state: eAuthState.AUTHENTICATED,
          error: null,
        });
        setAccount(account);
        if (onSuccess) {
          onSuccess(account);
        }

        return account;
      } catch (error) {
        setAuth({ state: eAuthState.ERROR, error } as tAuth);
        if (throwOnError) {
          throw error;
        }

        if (onError) {
          onError(error as Error);
        }

        return undefined;
      } finally {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [ultra?.account],
  );

  const logout = React.useCallback(
    async ({
      throwOnError,
      onError,
      onSuccess,
      onComplete,
    }: tLogoutOptions = {}): Promise<void> => {
      setAuth({
        state: eAuthState.AUTHENTICATING,
        error: null,
      });

      try {
        await ultra?.account?.disconnect();
        setAuth({ state: eAuthState.UNAUTHENTICATED, error: null });
        setAccount(undefined);
        if (onSuccess) {
          (onSuccess as () => void)();
        }
      } catch (error) {
        setAuth({ state: eAuthState.ERROR, error } as tAuth);

        if (throwOnError) {
          throw error;
        }

        if (onError) {
          (onError as (error: Error) => void)(error as Error);
        }
      } finally {
        if (onComplete) {
          (onComplete as () => void)();
        }
      }
    },
    [],
  );

  React.useEffect(() => {
    const init = async () => {
      try {
        const eagerlyConnection = localStorage.getItem('eagerlyConnection');
        if (eagerlyConnection !== 'true') throw new Error('Let it catch');
        const currentAccount = await ultra?.account?.connect({
          onlyIfTrusted: true,
        });
        if (currentAccount) {
          setAuth({
            state: eAuthState.AUTHENTICATED,
            error: null,
          });
          setAccount(currentAccount);
        } else {
          throw new Error('Let it catch');
        }
      } catch (error) {
        setAuth({
          state: eAuthState.UNAUTHENTICATED,
          error: null,
        });
        setAccount(undefined);
      }
    };

    init().catch(() => {
      console.error('Init failed');
    });
  }, []);

  React.useEffect(() => {
    _setUltra(
      new Ultra({
        bpApiEndpoint,
        extension: window?.ultra,
      }),
    );
    refreshMarketPrices()
      .then(() => {
        console.log('Market prices refreshed');
      })
      .catch(() => {
        console.error('Market prices refresh failed');
      });
  }, []);

  const isAuthenticated = auth.state === eAuthState.AUTHENTICATED;
  const isUnauthenticated = auth.state === eAuthState.UNAUTHENTICATED;
  const isAuthenticating = auth.state === eAuthState.AUTHENTICATING;
  const hasAuthError = auth.state === eAuthState.ERROR;
  const isLoggingOut = auth.state === eAuthState.LOGGING_OUT;
  const isAuthUndefined = auth.state === eAuthState.UNDEFINED;
  const isWalletInstalled = ultra?.account?.checkIsWalletInstalled() ?? false;

  return (
    <LocalisationProvider>
      <UltraContext.Provider
        value={{
          ultra,
          auth,
          account,
          login,
          logout,
          isAuthenticated,
          isUnauthenticated,
          isAuthenticating,
          hasAuthError,
          isLoggingOut,
          isAuthUndefined,
          isWalletInstalled,
          marketPrices,
          refreshMarketPrices,
          refreshAccount,
        }}
      >
        {children}
      </UltraContext.Provider>
    </LocalisationProvider>
  );
};

export default UltraProvider;
