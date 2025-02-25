import { useEffect, useState } from 'react';

const SEARCH_KEY = 'searchText';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setQuery(localStorage.getItem(SEARCH_KEY) || '');
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, query);
  }, [query]);

  return { query, setQuery };
};
