import { CountryData } from '@app/types/data.type';
import styles from './ListCard.module.scss';
import Card from '../card/Card';
import React from 'react';

interface ListCardProps {
  countries: CountryData[];
}

function ListCard({ countries }: ListCardProps) {
  return (
    <div className={styles.container}>
      {countries.map((country) => (
        <Card key={country.name.official} country={country} />
      ))}
    </div>
  );
}

export default React.memo(ListCard);
