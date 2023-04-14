import { type tAuth } from '../types';

/**
 * Defines the different authentication states and initial authentication object.
 */

/**
 * @category Auth
 */
export enum eAuthState {
  UNDEFINED = 'undefined',
  UNAUTHENTICATED = 'unauthenticated',
  AUTHENTICATED = 'authenticated',
  AUTHENTICATING = 'authenticating',
  LOGGING_OUT = 'logging_out',
  ERROR = 'error',
}

/**
 * The initial authentication object.
 *
 * @category Auth
 */
export const INITIAL_AUTH: tAuth = {
  /**
   * The authentication state.
   */
  state: eAuthState.UNDEFINED,
  /**
   * The authentication error.
   */
  error: null,
};
