import { unselectBooks } from '../../store/features/book/bookSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { convertToCSV } from '../../utils/convertToCSV';
import { useRef } from 'react';
import styles from './Flyout.module.scss';

function Flyout() {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.books.selectedBooks);
  const selectedItemsCount = selectedItems.length;
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const onDownloadHandler = () => {
    if (selectedItems.length === 0) return;

    const csvData = new Blob([convertToCSV(selectedItems)], {
      type: 'text/csv',
    });
    const csvURL = URL.createObjectURL(csvData);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = csvURL;
      downloadLinkRef.current.download = `${selectedItemsCount}_books.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(csvURL);
    }
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
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
    </div>
  );
}

export default Flyout;
