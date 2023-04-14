import { type tGetAccountOutput } from '../../apis';
import { type eAuthState } from '../constants';

/**
 * @category Auth
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
  onError?: (error: Error) => void;
  onSuccess?: (account: tGetAccountOutput) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
};

/**
 * @category Auth
 */
export type tLoginOptions = {
  onError?: (error: Error) => void;
  onSuccess?: (user: tGetAccountOutput) => void;
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
) => Promise<tGetAccountOutput | undefined>;
