import { NavLink } from 'react-router';
import styles from './Header.module.scss';
import { Links } from '@app/types/header.type';

const links: Links[] = [
  { title: 'All data', href: '/' },
  { title: 'Uncontrolled Form', href: '/uf' },
  { title: 'React Hook Form', href: '/rhf' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      {links.map((link) => (
        <NavLink
          to={link.href}
          key={link.href}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          {link.title}
        </NavLink>
      ))}
    </header>
  );
}
