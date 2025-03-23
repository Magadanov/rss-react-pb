import { useMemo, useState } from 'react';
import Filter from '../filter/Filter';
import ListCard from '../list-card/ListCard';
import Search from '../search/Search';
import Sorting from '../sorting/Sorting';
import { useGetData } from './hooks/useGetData';
import styles from './Main.module.scss';
import { CountryData, SortingOrderType } from '@app/types/data.type';

export default function Main() {
  const { data, isLoading, regions, error } = useGetData();
  const [visitedCountries, setVisitedCountries] = useState<CountryData[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const [filterValue, setFilterValue] = useState<string>('');
  const [sortValue, setSortValue] = useState<SortingOrderType>('default');
  const resultData = useMemo(
    () =>
      data
        ? data
            .map((item) => ({ ...item, isVisited: false }))
            .filter((item) =>
              searchValue
                ? item.name.common
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                : true
            )
            .filter((item) =>
              filterValue ? item.region === filterValue : true
            )
            .sort((a, b) => {
              if (sortValue === 'asc')
                return a.name.common.localeCompare(b.name.common);
              if (sortValue === 'desc')
                return b.name.common.localeCompare(a.name.common);
              return 0;
            })
        : [],
    [data, filterValue, searchValue, sortValue]
  );

  const searchHandler = (value: string) => {
    setSearchValue(value);
  };

  const filterHandler = (value: string) => {
    setFilterValue(value);
  };

  const sortHandler = (value: SortingOrderType) => {
    setSortValue(value);
  };

  const visitedHandler = (value: CountryData) => {
    setVisitedCountries((prev) => {
      const findIndex = prev.findIndex(
        (item) => item.name.official === value.name.official
      );
      if (findIndex >= 0) {
        return [...prev.slice(0, findIndex), ...prev.slice(findIndex + 1)];
      } else {
        return [...prev, value];
      }
    });
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
        error || (
          <ListCard
            countries={resultData}
            visitedCountries={visitedCountries}
            visitedHandler={visitedHandler}
          />
        )
      )}
    </main>
  );
}
