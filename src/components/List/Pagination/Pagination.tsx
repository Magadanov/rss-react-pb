import React from 'react';
import styles from './Pagination.module.scss';
import { PageData } from '../../../types/main';

interface PaginationProps {
  pageData: PageData;
  setPage: (pageNumber: number) => void;
}

class Pagination extends React.Component<PaginationProps> {
  prevButtonHandler = () => {
    this.props.setPage(this.props.pageData.pageNumber - 1);
  };

  nextButtonHandler = () => {
    this.props.setPage(this.props.pageData.pageNumber + 1);
  };

  render(): React.ReactNode {
    return (
      <div className={styles.pagination}>
        <button
          type="button"
          disabled={this.props.pageData.firstPage}
          onClick={this.prevButtonHandler}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={this.props.pageData.lastPage}
          onClick={this.nextButtonHandler}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
