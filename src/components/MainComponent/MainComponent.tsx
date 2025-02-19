'use client';

import { useSearchQuery } from '@/hooks/useSearchQuery';
import styles from './MainComponent.module.scss';
import Search from '../Search/Search';
import List from '../List/List';
import Flyout from '../Flyout/Flyout';
import { Theme } from '@/ui/Theme/Theme';
import ErrorButton from '../ErrorButton/ErrorButton';

export default function MainComponent() {
  const { query, setQuery } = useSearchQuery();

  return (
    <div className={styles.container}>
      <header>Book Searching</header>
      <Search searchText={query} setSearchText={setQuery} />
      <List searchText={query} />
      <Flyout />
      <Theme />
      <ErrorButton />
    </div>
  );
}
