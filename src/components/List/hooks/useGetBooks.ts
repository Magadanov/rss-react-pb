import { useEffect, useState } from 'react';
import { BooksResponse } from '../../../types/main';
import { apiService } from '../../../api/apiService';

export const useGetBooks = ({
  pageNumber,
  searchValue,
}: {
  pageNumber: number;
  searchValue: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<BooksResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await apiService.getBooks({
          pageNumber,
          searchValue,
        });

        setData(data);
        setError('');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNumber, searchValue]);

  return {
    isLoading,
    error,
    books: data ? data.books : [],
    pageData: data?.page,
  };
};
