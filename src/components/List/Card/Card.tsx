import styles from './Card.module.scss';
import { Book } from '../../../types/main';
import React, { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleBook } from '../../../store/features/book/bookSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Card({ card }: { card: Book }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { page } = router.query as { page: string };
  const selectedBooks = useAppSelector((state) => state.books.selectedBooks);
  const isChecked = selectedBooks.some((book) => book.uid === card.uid);

  const handleCheckbox = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleBook({ book: card }));
  };

  return (
    <Link
      href={`${page}/?bookId=${card.uid}`}
      shallow
      className={styles.card}
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
    </Link>
  );
}

export default React.memo(Card);
