import { type tUltraAccount } from '../../account';
import { type eAuthState } from '../constants';

/**
 * @category Auth
 * @description The Auth object
 *
 */
export type tAuth =
  | {
      state: eAuthState.UNDEFINED;
      error: null;
    }
  | {
      state: eAuthState.UNAUTHENTICATED;
      error: null;
    }
  | {
      state: eAuthState.AUTHENTICATED;
      error: null;
    }
  | {
      state: eAuthState.AUTHENTICATING;
      error: null;
    }
  | {
      state: eAuthState.ERROR;
      error: Error;
    }
  | {
      state: eAuthState.LOGGING_OUT;
      error: null;
    };

/**
 * @category Auth
 */
export type tAuthOptions = {
  onError?: (error: Error) => tUltraAccount;
  onSuccess?: (account: tUltraAccount) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
};

/**
 * @category Auth
 */
export type tLoginOptions = {
  onError?: (error: Error) => tUltraAccount;
  onSuccess?: (user: tUltraAccount) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
};

/**
 * @category Auth
 */
export type tLogoutOptions = {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onComplete?: () => void;
  throwOnError?: boolean;
};

/**
 * @category Auth
 */
export type tLogin = (
  accountName: string,
  options?: tLoginOptions,
) => Promise<tUltraAccount | undefined>;
