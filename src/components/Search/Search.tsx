import React, { ChangeEvent, SetStateAction, useState } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  searchText: string;
  setSearchText: React.Dispatch<SetStateAction<string>>;
}

let render = 0;

function Search(props: SearchProps) {
  const [inputText, setInputText] = useState(props.searchText);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSearchHandler = () => {
    const searchValue = inputText.trim();
    props.setSearchText(searchValue);
  };

  console.log('Render search', render++);

  return (
    <section className={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        value={inputText}
        onChange={onChangeHandler}
      />
      <button type="button" className={styles.button} onClick={onSearchHandler}>
        Search
      </button>
    </section>
  );
}

export default React.memo(Search);
