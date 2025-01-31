import styles from './Pagination.module.scss';
import { PageData } from '../../../types/main';
import React, { SetStateAction } from 'react';

interface PaginationProps {
  pageData: PageData;
  setPage: React.Dispatch<SetStateAction<number>>;
}
let render = 0;

function Pagination(props: PaginationProps) {
  const prevButtonHandler = () => {
    props.setPage((prev) => prev - 1);
  };

  const nextButtonHandler = () => {
    props.setPage((prev) => prev + 1);
  };
  console.log('Render pagination', render++);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={props.pageData.firstPage}
        onClick={prevButtonHandler}
      >
        Prev
      </button>
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
