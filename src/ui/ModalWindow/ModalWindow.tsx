import { PropsWithChildren } from 'react';
import styles from './ModalWindow.module.scss';

export const ModalWindow = ({
  children,
  onClose,
}: PropsWithChildren<{ onClose: () => void }>) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
