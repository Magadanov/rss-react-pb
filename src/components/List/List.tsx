import React from 'react';
import styles from './List.module.scss';
import { Book, PageData } from '../../types/main';
import { apiService } from '../../api/apiService';
import Card from './Card/Card';
import Pagination from './Pagination/Pagination';

interface ListProps {
  searchText: string;
}

interface ListState {
  isLoading: boolean;
  error: string;
  pageNumber: number;
  books: Book[];
  pageData: PageData | null;
}

class List extends React.Component<ListProps, ListState> {
  state = {
    isLoading: true,
    error: '',
    pageNumber: 0,
    books: [],
    pageData: null,
  };
  componentDidMount(): void {
    this.fetchData(this.props.searchText);
  }

  componentDidUpdate(
    prevProps: Readonly<ListProps>,
    prevState: Readonly<ListState>
  ): void {
    if (
      prevProps.searchText !== this.props.searchText ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.fetchData(this.props.searchText);
    }
  }

  async fetchData(searchValue: string) {
    try {
      this.setState({ isLoading: true });

      const data = await apiService.getBooks({
        pageNumber: this.state.pageNumber,
        searchValue,
      });

      this.setState({
        pageData: data.page,
        books: data.books,
        error: '',
      });
    } catch (err) {
      this.setState({
        error: (err as Error).message,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  setPage = (pageNumber: number) => {
    this.setState({ pageNumber });
  };

  render(): React.ReactNode {
    if (this.state.isLoading) {
      return <span className="loader" style={{ margin: '0 auto' }}></span>;
    }

    return (
      <div className={styles.list}>
        {this.state.books.length > 0 && !this.state.error ? (
          <>
            <div className={styles.card}>
              <strong className={styles.title}>Book Title</strong>
              <strong className={styles.pubYear}>Published Year</strong>
            </div>
            {this.state.books.map((book: Book) => (
              <Card key={book.uid} card={book} />
            ))}
            <Pagination
              pageData={this.state.pageData!}
              setPage={this.setPage}
            />
          </>
        ) : (
          this.state.error
        )}
      </div>
    );
  }
}

export default List;
