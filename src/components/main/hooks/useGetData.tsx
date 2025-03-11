import { useEffect, useState } from 'react';
import { apiService } from '@app/api/service';
import { CountryData } from '@app/types/data.type';

export const useGetData = () => {
  const [data, setData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await apiService.getCountryData();

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const result = (await res.json()) as CountryData[];
        setData(Array.isArray(result) ? result : []);
      } catch (e) {
        setError((e as Error).message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const regions: string[] =
    data.length > 0 ? [...new Set(data.map((item) => item.region))] : [];

  return { data, isLoading, error, regions };
};
