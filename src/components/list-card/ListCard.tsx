import { CountryData } from '@app/types/data.type';
import styles from './ListCard.module.scss';
import Card from '../card/Card';

interface ListCardProps {
  countries: CountryData[];
}

export default function ListCard({ countries }: ListCardProps) {
  return (
    <div className={styles.container}>
      {countries.map((country) => (
        <Card key={country.name.official} country={country} />
      ))}
    </div>
  );
}
