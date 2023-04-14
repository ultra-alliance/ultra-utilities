// istanbul ignore file

import {
  type tUltra,
  type tGetAccountOutput,
  type tAuth,
  type tLogoutOptions,
  type tLoginOptions,
  Ultra,
  INITIAL_AUTH,
  eAuthState,
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

const UltraProvider = ({ children, bpApiEndpoint }: tUltraProvider) => {
  const [ultra, setUltra] = React.useState<tUltra | undefined>(
    new Ultra({
      bpApiEndpoint,
    }),
  );
  const [auth, setAuth] = React.useState<tAuth>(INITIAL_AUTH);
  const [account, setAccount] = React.useState<tGetAccountOutput | undefined>(
    undefined,
  );

  const login = React.useCallback(
    async (
      accountName: string,
      { throwOnError, onError, onSuccess, onComplete }: tLoginOptions = {},
    ): Promise<tGetAccountOutput | undefined> => {
      setAuth({
        state: eAuthState.AUTHENTICATING,
        error: null,
      });
      try {
        const account = await ultra?.getAccount({ accountName });
        if (!account) {
          throw new Error('Account not found');
        }

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
    [],
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

  const updateBpApiEndpoint = React.useCallback(async () => {
    setUltra(
      new Ultra({
        bpApiEndpoint,
      }),
    );
  }, [bpApiEndpoint]);

  React.useEffect(() => {
    try {
      const currentAccount = account;
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
  }, []);

  const isAuthenticated = auth.state === eAuthState.AUTHENTICATED;
  const isUnauthenticated = auth.state === eAuthState.UNAUTHENTICATED;
  const isAuthenticating = auth.state === eAuthState.AUTHENTICATING;
  const hasAuthError = auth.state === eAuthState.ERROR;
  const isLoggingOut = auth.state === eAuthState.LOGGING_OUT;
  const isAuthUndefined = auth.state === eAuthState.UNDEFINED;

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
          updateBpApiEndpoint,
        }}
      >
        {children}
      </UltraContext.Provider>
    </LocalisationProvider>
  );
};

export default UltraProvider;
