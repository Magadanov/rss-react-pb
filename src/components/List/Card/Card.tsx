import styles from '../List.module.scss';
import { Book } from '../../../types/main';
import React from 'react';

let render = 0;
function Card({ card }: { card: Book }) {
  console.log('Render card', render++);
  return (
    <div className={styles.card}>
      <p className={styles.title}>{card.title}</p>
      <p className={styles.pubYear}>{card.publishedYear}</p>
    </div>
  );
}

export default React.memo(Card);
