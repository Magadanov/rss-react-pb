import { unselectBooks } from '../../store/features/book/bookSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { convertToCSV } from '../../utils/convertToCSV';
import styles from './Flyout.module.scss';

function Flyout() {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.books.selectedBooks);
  const selectedItemsCount = selectedItems.length;

  const onDownloadHandler = () => {
    const csvData = new Blob([convertToCSV(selectedItems)], {
      type: 'text/csv',
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${selectedItemsCount}_books.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onUnselectHandler = () => {
    dispatch(unselectBooks());
  };

  return (
    <div
      className={`${styles.flyout} ${selectedItemsCount === 0 ? styles.closed : ''}`}
    >
      <span data-testid="selected-item">
        {selectedItemsCount} {selectedItemsCount <= 1 ? 'item' : 'items'}{' '}
        selected
      </span>
      <button className="btn danger-btn" onClick={onUnselectHandler}>
        Unselect all
      </button>
      <button className="btn primary-btn" onClick={onDownloadHandler}>
        Download
      </button>
    </div>
  );
}

export default Flyout;
