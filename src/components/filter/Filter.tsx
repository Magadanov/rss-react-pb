import { ChangeEvent } from 'react';
import styles from './Filter.module.scss';

interface FilterProps {
  regions: string[];
  filterValue: string;
  filterHandler: (value: string) => void;
}

export default function Filter({
  regions,
  filterValue,
  filterHandler,
}: FilterProps) {
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    filterHandler(value);
  };

  return (
    <div className={styles.filter}>
      <select onChange={onChangeHandler} value={filterValue}>
        <option value="">All regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
