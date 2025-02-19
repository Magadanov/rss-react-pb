'use client';

import { useEffect, useState } from 'react';

const SEARCH_KEY = 'searchText';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const lsValue = localStorage.getItem(SEARCH_KEY) || '';
    setQuery(lsValue);
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, query);
  }, [query]);

  return { query, setQuery };
};
