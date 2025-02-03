import { useCallback, useState } from 'react';

export const useFetching = <T>(apiCallback: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<T>();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await apiCallback();

      setData(data);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [apiCallback]);

  return {
    isLoading,
    error,
    data,
    fetchData,
  };
};
