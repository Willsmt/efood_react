import { useEffect, useState } from 'react';

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export const useFetch = <T>(
  fetcher: () => Promise<T>,
  errorMessage: string,
  deps: unknown[] = [],
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError(errorMessage);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, isLoading, error };
};
