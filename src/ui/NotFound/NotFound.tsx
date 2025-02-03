import { useNavigate } from 'react-router';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Not Found</h2>
      <button type="button" onClick={() => navigate('/')}>
        Return Main
      </button>
    </div>
  );
};
