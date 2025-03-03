import { Card } from '@app/components/Card/Card';
import { useAppDispatch, useAppSelector } from '@app/store';
import { makeFormDataReadable } from '@app/store/reducer/form';
import { useEffect } from 'react';

export default function Main() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form.data);

  useEffect(() => {
    return () => {
      dispatch(makeFormDataReadable());
    };
  }, []);

  return (
    <div>
      {formData.length > 0
        ? formData.map((data) => <Card key={data.id} data={data} />)
        : 'no form data'}
    </div>
  );
}
