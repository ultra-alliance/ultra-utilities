import { type tAuth } from '../types';

export enum eAuthState {
  UNDEFINED = 'undefined',
  UNAUTHENTICATED = 'unauthenticated',
  AUTHENTICATED = 'authenticated',
  AUTHENTICATING = 'authenticating',
  LOGGING_OUT = 'logging_out',
  ERROR = 'error',
}

export const INITIAL_AUTH: tAuth = {
  state: eAuthState.UNDEFINED,
  error: null,
};
