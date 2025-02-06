import styles from './List.module.scss';
import { Book, BooksResponse } from '../../types/main';
import Card from './Card/Card';
import Pagination from '../../ui/Pagination/Pagination';
import { useFetching } from '../../hooks/useFetching';
import { apiService } from '../../api/apiService';
import { Loader } from '../../ui/Loader/Loader';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

interface ListProps {
  searchText: string;
}

function List({ searchText }: ListProps) {
  const { page } = useParams();
  const navigate = useNavigate();
  const { fetchData, isLoading, error, data } = useFetching<BooksResponse>(() =>
    apiService.getBooks({
      pageNumber: Number(page) || 1,
      searchValue: searchText,
    })
  );

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const onCardOpen = useCallback(
    (id: string) => {
      navigate('detail/' + id);
    },
    [navigate]
  );

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
            <Card
              key={book.uid}
              card={book}
              onClick={() => onCardOpen(book.uid)}
            />
          ))}
          <Pagination pageData={data.page!} setPage={setPage} />
        </>
      ) : (
        error || 'No book found'
      )}
    </div>
  );
}

export default List;
