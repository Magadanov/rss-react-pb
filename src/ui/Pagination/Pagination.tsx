import styles from './Pagination.module.scss';
import { PageData } from '../../types/main';

interface PaginationProps {
  pageData: PageData;
  setPage: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const prevButtonHandler = () => {
    props.setPage(props.pageData.pageNumber - 1);
  };

  const nextButtonHandler = () => {
    props.setPage(props.pageData.pageNumber + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={props.pageData.firstPage}
        onClick={prevButtonHandler}
      >
        Prev
      </button>
      <span data-testid="page-number">{props.pageData.pageNumber}</span>
      <button
        type="button"
        disabled={props.pageData.lastPage}
        onClick={nextButtonHandler}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
