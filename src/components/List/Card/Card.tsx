import styles from './Card.module.scss';
import { Book } from '../../../types/main';
import React, { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleBook } from '../../../store/features/book/bookSlice';
import { useNavigate } from 'react-router';

function Card({ card }: { card: Book }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedBooks = useAppSelector((state) => state.books.selectedBooks);
  const isChecked = selectedBooks.some((book) => book.uid === card.uid);

  const onClickHandler = (id: string) => {
    navigate('detail/' + id);
  };

  const handleCheckbox = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleBook({ book: card }));
  };

  return (
    <div
      className={styles.card}
      onClick={() => onClickHandler(card.uid)}
      data-testid="card-component"
    >
      <p className={styles.title}>{card.title}</p>
      <p className={styles.pubYear}>{card.publishedYear}</p>
      <input
        className={styles.checkbox}
        type="checkbox"
        onClick={handleCheckbox}
        checked={isChecked}
        readOnly
      />
    </div>
  );
}

export default React.memo(Card);
