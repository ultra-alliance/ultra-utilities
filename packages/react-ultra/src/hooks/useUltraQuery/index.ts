import { useState, useEffect, useCallback } from 'react';

type QueryFn = () => Promise<unknown>;

type CallbackFn = (data: unknown) => void;

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

const useUltraQuery = ({
  queryFn,
  callback,
  autofetch = true,
}: {
  queryFn: QueryFn;
  callback?: CallbackFn;
  autofetch?: boolean;
  triggers?: unknown[];
}) => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(autofetch);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log(error);
      const result: unknown = await queryFn();
      setData(result);
      if (callback) {
        callback(result);
      }
    } catch (error: unknown) {
      console.log(error);
      setError(error);
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
