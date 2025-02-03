import styles from '../List.module.scss';
import { Book } from '../../../types/main';
import React from 'react';

function Card({
  card,
  ...rest
}: { card: Book } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles.card} {...rest} style={{ cursor: 'pointer' }}>
      <p className={styles.title}>{card.title}</p>
      <p className={styles.pubYear}>{card.publishedYear}</p>
    </div>
  );
}

export default React.memo(Card);
