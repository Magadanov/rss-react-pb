import { CountryData } from '@app/types/data.type';
import styles from './Card.module.scss';
import React from 'react';

interface CardProps {
  country: CountryData;
}

function Card({ country }: CardProps) {
  return (
    <div className={styles.card}>
      <img className={styles.flag} src={country.flags.svg} alt="flag" />
      <div className={styles.info}>
        <h3>{country.name.common}</h3>
        <div>
          <strong>Region: </strong>
          <span>{country.region}</span>
        </div>
        <div>
          <strong>Population: </strong>
          <span>{country.population}</span>
        </div>
        <div>
          <strong>Area: </strong>
          <span>{country.area}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);
