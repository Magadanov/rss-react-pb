import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import { cn } from '@app/utils/cn';

export const Button = ({
  title = 'Button',
  className,
  ...rest
}: ButtonHTMLAttributes<{
  title?: string;
}>) => {
  return (
    <button className={cn(className, styles.btn)} {...rest}>
      {title}
    </button>
  );
};
