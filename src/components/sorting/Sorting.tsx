import { Button } from '@app/ui/button/Button';
import styles from './Sorting.module.scss';
import { cn } from '@app/utils/cn';
import { SortingOrderType } from '@app/types/data.type';

interface SortingProps {
  order: SortingOrderType;
  sortHandler: (order: SortingOrderType) => void;
}

const SortingIcon: Record<SortingOrderType, string> = {
  default: '↕',
  asc: '↑',
  desc: '↓',
};

const sortingOrder: Record<SortingOrderType, SortingOrderType> = {
  default: 'asc',
  asc: 'desc',
  desc: 'default',
};

export default function Sorting({ order, sortHandler }: SortingProps) {
  const onClickHandler = () => {
    sortHandler(sortingOrder[order]);
  };

  const icon = SortingIcon[order];
  return (
    <Button
      className={cn(styles.sorting, styles[order])}
      onClick={onClickHandler}
    >
      {icon}
    </Button>
  );
}
