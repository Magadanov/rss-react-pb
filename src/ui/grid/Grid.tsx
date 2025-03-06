import { PropsWithChildren } from 'react';
import styles from './Grid.module.scss';
import { cn } from '@app/utils/cn';

export const GridLayout = ({
  children,
  direction = 'col',
}: PropsWithChildren<{ direction?: 'row' | 'col' }>) => {
  return (
    <div className={cn(styles.container, styles[direction])}>{children}</div>
  );
};
