import styles from './List.module.scss';
import { Book } from '../../types/main';
import Card from './Card/Card';
import Pagination from '../../ui/Pagination/Pagination';
import { Loader } from '../../ui/Loader/Loader';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetBooksMutation } from '../../store/features/book/bookApi';

interface ListProps {
  searchText: string;
}

function List({ searchText }: ListProps) {
  const { page } = useParams();
  const navigate = useNavigate();
  const [getBooks, { data, isLoading, error }] = useGetBooksMutation();

  useEffect(() => {
    getBooks({
      pageNumber: Number(page) || 1,
      searchValue: searchText,
    });
  }, [getBooks, page, searchText]);

  const setPage = (page: number) => {
    navigate(`/${page + 1}`);
  };

  if (isLoading) {
    return <Loader style={{ margin: '0 auto' }} />;
  }

  return (
    <div className={styles.list}>
      {data && data.books.length > 0 && !error ? (
        <>
          <div className={styles.card}>
            <strong className={styles.title}>Book Title</strong>
            <strong className={styles.pubYear}>Published Year</strong>
          </div>
          {data.books.map((book: Book) => (
            <Card key={book.uid} card={book} />
          ))}
          <Pagination pageData={data.page!} setPage={setPage} />
        </>
      ) : (
        error && 'No book found'
      )}
    </div>
  );
}

export default List;
