/**
 * A promise that resolves to a generic type
 * @category Hooks
 */

export type tQueryFn<T> = () => Promise<T>;

/**
 * A function that accepts a generic type and returns void.
 * @category Hooks
 */
export type tCallbackFn<T> = (data: T) => void;

/**
 * A function that accepts an error and returns void.
 * @category Hooks
 */
export type tErrorFn = (error: Error) => void;

/**
 * Parmaters for the `useUltraQuery` hook.
 * @category Hooks
 */

export type tUseUltraQueryParams<T> = {
  queryFn: tQueryFn<T>;
  callback?: tCallbackFn<T>;
  onError?: tErrorFn;
  autofetch?: boolean;
};

/**
 * An object with `data`, `isLoading`, `error`, and `fetchData` properties returned by the `useUltraQuery` hook.
 * @category Hooks
 */
export type tUseUltraQuery<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: unknown;
  fetchData: () => Promise<void>;
};
