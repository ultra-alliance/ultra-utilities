import { useState, useEffect, useCallback } from 'react';

type QueryFn<T> = () => Promise<T>;

type CallbackFn<T> = (data: T) => void;

type ErrorFn = (error: Error) => void;

type UseUltraQuery<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: unknown;
  fetchData: () => Promise<void>;
};

/**
 * A custom React Hook that accepts a `queryFn` function that returns a Promise with data and a `callback` function that accepts that data as an argument.
 *
 * @category Hooks
 * @param queryFn - A function that returns a Promise with an unknown value.
 * @param callback - A function that accepts an unknown value and returns void.
 * @param autofetch - A boolean indicating whether to automatically fetch data on mount.
 *
 * @returns An object with `data`, `isLoading`, `error`, and `fetchData` properties.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, fetchData } = useUltraQuery({
 *  queryFn: async () => {
 *   const response = await ultra.getUosBalance("ultra.nft.ft");
 *  return response;
 * },
 * callback: (data) => {
 *  console.log(data);
 * },
 * autofetch: true,
 * });
 * ```
 *
 *
 */

const useUltraQuery = <T>({
  queryFn,
  callback,
  onError,
  autofetch = true,
}: {
  queryFn: QueryFn<T>;
  callback?: CallbackFn<T>;
  onError?: ErrorFn;
  autofetch?: boolean;
  triggers?: unknown[];
}): UseUltraQuery<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(autofetch);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log(error);
      const result: T = await queryFn();
      setData(result);
      if (callback) {
        callback(result);
      }
    } catch (error: unknown) {
      console.log(error);
      setError(error);
      if (onError) {
        onError(error as Error);
      }
    }

    setIsLoading(false);
  }, [callback, error, queryFn]);

  useEffect(() => {
    if (autofetch) {
      void fetchData();
    }
  }, []);

  return { data, isLoading, error, fetchData };
};

export default useUltraQuery;
