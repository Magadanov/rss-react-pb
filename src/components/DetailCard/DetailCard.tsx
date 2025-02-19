import styles from './DetailCard.module.scss';
import { Loader } from '../../ui/Loader/Loader';
import { ModalWindow } from '../../ui/ModalWindow/ModalWindow';
import { useGetBookQuery } from '../../store/features/book/bookApi';
import { useRouter } from 'next/router';

function DetailCard({ id, page }: { id: string; page: string }) {
  const router = useRouter();
  const { isLoading, error, data } = useGetBookQuery(id);

  const onCloseHandler = () => {
    router.push(`/${page}`, undefined, { shallow: true });
  };

  return (
    <ModalWindow onClose={onCloseHandler}>
      <div className={styles.detail}>
        <span
          className={styles.closeBtn}
          onClick={onCloseHandler}
          data-testid="close-button"
        >
          x
        </span>
        {isLoading ? (
          <Loader loaderClass={styles.loader} />
        ) : data ? (
          <>
            <h3>Detail: {data.book.title}</h3>
            <div>
              <strong>Publish year: </strong>
              <span>{data.book.publishedYear}</span>
            </div>
            <h4>Authors:</h4>
            {data.book.authors.map((author) => (
              <div key={author.uid}>{author.name}</div>
            ))}

            <h4>Artists:</h4>
            {data.book.artists.map((artist) => (
              <div key={artist.uid}>{artist.name}</div>
            ))}
          </>
        ) : (
          error && 'Smth happened'
        )}
      </div>
    </ModalWindow>
  );
}

export default DetailCard;
