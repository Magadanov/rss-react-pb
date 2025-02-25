import styles from './DetailCard.module.scss';
import { useNavigate, useParams } from 'react-router';
import { ModalWindow } from '../../ui/ModalWindow/ModalWindow';
import { apiService } from '../../api/apiService';
import { BookResponse } from '../../types/main';

export async function loader({ params: { id } }: { params: { id: string } }) {
  const detailData = await apiService.getBook(id);
  return detailData;
}

function DetailCard({ loaderData: data }: { loaderData: BookResponse }) {
  const { page } = useParams();
  const navigate = useNavigate();

  const onCloseHandler = () => {
    navigate(`/${page || ''}`);
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

        {data.book ? (
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
          'Smth happened'
        )}
      </div>
    </ModalWindow>
  );
}

export default DetailCard;
