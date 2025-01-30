import React from 'react';
import Search from './components/Search/Search';
import List from './components/List/List';
import { LS } from './types/main';
import ErrorBoundary from './Error';
import ErrorButton from './components/ErrorButton/ErrorButton';

class App extends React.Component {
  state = {
    searchText: localStorage.getItem(LS.searchText) || '',
  };

  setSearchText = (value: string) => {
    this.setState({
      searchText: value,
    });
  };

  render(): React.ReactNode {
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
          <Search setSearchText={this.setSearchText} />
          <List searchText={this.state.searchText} />
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
