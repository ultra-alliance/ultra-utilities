import { useState, useEffect, useCallback } from 'react';

type QueryFn = () => Promise<unknown>;

type CallbackFn = (data: unknown) => void;

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
