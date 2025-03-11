import { Button } from '@app/ui/button/Button';
import styles from './Search.module.scss';
import { ChangeEvent, useState } from 'react';

interface SearchProps {
  searchHandler: (value: string) => void;
}

export default function Search({ searchHandler }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={onChangeHandler}
      />
      <Button onClick={() => searchHandler(searchValue)}>Search</Button>
    </div>
  );
}
