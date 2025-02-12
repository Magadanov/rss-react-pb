import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import styles from './Theme.module.scss';

export const Theme = () => {
  const { darkMode, toggleTheme } = useTheme();

  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    toggleTheme();
  };

  return (
    <img
      src={darkMode ? 'light.svg' : 'dark.svg'}
      alt="theme"
      className={`${styles.theme} ${isRotating ? styles.rotate : ''}`}
      onClick={handleClick}
    />
  );
};
