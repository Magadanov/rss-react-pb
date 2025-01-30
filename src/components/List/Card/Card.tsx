import React from 'react';
import styles from '../List.module.scss';
import { Book } from '../../../types/main';

class Card extends React.PureComponent<{ card: Book }> {
  render(): React.ReactNode {
    return (
      <div className={styles.card}>
        <p className={styles.title}>{this.props.card.title}</p>
        <p className={styles.pubYear}>{this.props.card.publishedYear}</p>
      </div>
    );
  }
}

export default Card;
