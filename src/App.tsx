import Search from './components/Search/Search';
import List from './components/List/List';
import ErrorBoundary from './Error';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { useSearchQuery } from './hooks/useSearchQuery';

let render = 0;
function App() {
  const { query, setQuery } = useSearchQuery();
  console.log('Render app', render++);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: '50px 0px',
        width: '500px',
      }}
    >
      <ErrorBoundary>
        <header>Book Searching</header>
        <Search searchText={query} setSearchText={setQuery} />
        <List searchText={query} />
        <ErrorButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;
