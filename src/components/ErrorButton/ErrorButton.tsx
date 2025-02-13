import { useState } from 'react';

function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('smth error');
  }
  return (
    <button type="button" onClick={throwError}>
      Error
    </button>
  );
}

export default ErrorButton;
