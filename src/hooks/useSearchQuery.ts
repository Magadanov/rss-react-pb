import { useState } from 'react';

const SEARCH_KEY = 'searchText';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => {
    return localStorage.getItem(SEARCH_KEY) || '';
  });

  localStorage.setItem(SEARCH_KEY, query);

  return { query, setQuery };
};
