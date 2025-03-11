import { useState } from 'react';
import Filter from '../filter/Filter';
import ListCard from '../list-card/ListCard';
import Search from '../search/Search';
import Sorting from '../sorting/Sorting';
import { useGetData } from './hooks/useGetData';
import styles from './Main.module.scss';
import { SortingOrderType } from '@app/types/data.type';

export default function Main() {
  const { data, isLoading, regions, error } = useGetData();
  const [searchValue, setSearchValue] = useState<string>();
  const [filterValue, setFilterValue] = useState<string>('');
  const [sortValue, setSortValue] = useState<SortingOrderType>('default');
  const resultData = data
    ? data
        .filter((item) =>
          searchValue
            ? item.name.common.toLowerCase().includes(searchValue.toLowerCase())
            : true
        )
        .filter((item) => (filterValue ? item.region === filterValue : true))
        .sort((a, b) => {
          if (sortValue === 'asc')
            return a.name.common.localeCompare(b.name.common);
          if (sortValue === 'desc')
            return b.name.common.localeCompare(a.name.common);
          return 0;
        })
    : [];

  const searchHandler = (value: string) => {
    setSearchValue(value);
  };

  const filterHandler = (value: string) => {
    setFilterValue(value);
  };

  const sortHandler = (value: SortingOrderType) => {
    setSortValue(value);
  };

  return (
    <main className={styles.main}>
      <section className={styles.query}>
        <Search searchHandler={searchHandler} />
        <Filter
          regions={regions}
          filterValue={filterValue}
          filterHandler={filterHandler}
        />
        <Sorting order={sortValue} sortHandler={sortHandler} />
      </section>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        error || <ListCard countries={resultData} />
      )}
    </main>
  );
}
