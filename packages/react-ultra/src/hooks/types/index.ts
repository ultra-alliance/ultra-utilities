/**
 * A promise that resolves to a generic type
 * @category Hooks
 */

export type tQueryFn<tArgs, tRes> = (args?: tArgs) => Promise<tRes>;

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

export type tUseUltraQueryParams<tArgs, tRes> = {
  queryFn: tQueryFn<tArgs, tRes>;
  callback?: tCallbackFn<tRes>;
  onError?: tErrorFn;
  autofetch?: boolean;
};

/**
 * An object with `data`, `isLoading`, `error`, and `fetchData` properties returned by the `useUltraQuery` hook.
 * @category Hooks
 */
export type tUseUltraQuery<tArgs, tRes> = {
  data: tRes | undefined;
  isLoading: boolean;
  error: unknown;
  fetchData: (args?: tArgs) => Promise<void>;
};
