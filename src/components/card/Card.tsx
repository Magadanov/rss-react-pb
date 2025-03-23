import { CountryData } from '@app/types/data.type';
import styles from './Card.module.scss';
import React from 'react';
import { cn } from '@app/utils/cn';

interface CardProps {
  country: CountryData;
  visitedCountries: CountryData[];
  visitedHandler: (item: CountryData) => void;
}

function Card({ country, visitedCountries, visitedHandler }: CardProps) {
  const isVisited = visitedCountries.some(
    (item) => item.name.official === country.name.official
  );

  return (
    <div
      className={cn(styles.card, isVisited && styles.isVisited)}
      onClick={() => visitedHandler(country)}
    >
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
