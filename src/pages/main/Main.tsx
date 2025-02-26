import { Card } from '@app/components/Card/Card';
import { useAppSelector } from '@app/store';

export default function Main() {
  const formData = useAppSelector((state) => state.form.data);

  return (
    <div>
      {formData.length > 0
        ? formData.map((data) => <Card key={data.id} data={data} />)
        : 'no form data'}
    </div>
  );
}
