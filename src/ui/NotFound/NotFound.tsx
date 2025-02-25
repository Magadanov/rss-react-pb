'use client';
import { useRouter } from 'next/navigation';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Not Found</h2>
      <button type="button" onClick={() => router.push('/')}>
        Return Main
      </button>
    </div>
  );
};
