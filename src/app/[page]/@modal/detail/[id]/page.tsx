import DetailCard from '@/components/DetailCard/DetailCard';

interface Props {
  params: {
    id: string;
  };
}

export default function DetailPage({ params: { id } }: Props) {
  return <DetailCard id={id} />;
}
