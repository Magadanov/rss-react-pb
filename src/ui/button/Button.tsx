import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import { cn } from '@app/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={cn(className, styles.btn)} {...rest}>
      {children || 'Button'}
    </button>
  );
};
