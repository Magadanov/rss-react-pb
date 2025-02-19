import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import styles from './Theme.module.scss';
import light from '@/assets/light.svg';
import dark from '@/assets/dark.svg';
import Image from 'next/image';

export const Theme = () => {
  const { darkMode, toggleTheme } = useTheme();

  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    toggleTheme();
  };

  return (
    <Image
      src={darkMode ? light : dark}
      alt="theme"
      className={`${styles.theme} ${isRotating ? styles.rotate : ''}`}
      onClick={handleClick}
    />
  );
};
