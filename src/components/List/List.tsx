import { useState } from 'react';
import styles from './List.module.scss';
import { Book } from '../../types/main';
import Card from './Card/Card';
import Pagination from './Pagination/Pagination';
import { useGetBooks } from './hooks/useGetBooks';

interface ListProps {
  searchText: string;
}
let render = 0;

function List({ searchText }: ListProps) {
  const [pageNumber, setPageNumber] = useState(0);
  const { isLoading, error, books, pageData } = useGetBooks({
    pageNumber,
    searchValue: searchText,
  });

  if (isLoading) {
    return <span className="loader" style={{ margin: '0 auto' }}></span>;
  }
  console.log('Render list', render++);

  return (
    <div className={styles.list}>
      {books.length > 0 && !error ? (
        <>
          <div className={styles.card}>
            <strong className={styles.title}>Book Title</strong>
            <strong className={styles.pubYear}>Published Year</strong>
          </div>
          {books.map((book: Book) => (
            <Card key={book.uid} card={book} />
          ))}
          <Pagination pageData={pageData!} setPage={setPageNumber} />
        </>
      ) : (
        error
      )}
    </div>
  );
}

export default List;
