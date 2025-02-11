import Search from './components/Search/Search';
import List from './components/List/List';
import ErrorBoundary from './Error';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { useSearchQuery } from './hooks/useSearchQuery';
import { Outlet } from 'react-router';
import styles from './App.module.scss';
import Flyout from './components/Flyout/Flyout';

function App() {
  const { query, setQuery } = useSearchQuery();

  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <header>Book Searching</header>
        <Search searchText={query} setSearchText={setQuery} />
        <List searchText={query} />
        <Flyout />
        <Outlet />
        <ErrorButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;
