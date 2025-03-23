import styles from './Header.module.scss';

export const Header = ({ text }: { text: string }) => {
  return <header className={styles.header}>{text}</header>;
};
