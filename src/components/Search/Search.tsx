import React, { ChangeEvent } from 'react';
import styles from './Search.module.scss';
import { LS } from '../../types/main';

interface SearchProps {
  setSearchText: (value: string) => void;
}

interface SearchState {
  inputText: string;
}

class Search extends React.PureComponent<SearchProps, SearchState> {
  state = {
    inputText: localStorage.getItem(LS.searchText) || '',
  };

  onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };

  onSearchHandler = () => {
    const searchValue = this.state.inputText.trim();
    localStorage.setItem(LS.searchText, searchValue);
    this.props.setSearchText(searchValue);
  };

  render(): React.ReactNode {
    return (
      <section className={styles.container}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
          value={this.state.inputText}
          onChange={this.onChangeHandler}
        />
        <button
          type="button"
          className={styles.button}
          onClick={this.onSearchHandler}
        >
          Search
        </button>
      </section>
    );
  }
}

export default Search;
