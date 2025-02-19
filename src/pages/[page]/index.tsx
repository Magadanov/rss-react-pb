import MainComponent from '@/components/MainComponent/MainComponent';
import Layout from './layout';
import { useRouter } from 'next/router';
import DetailCard from '@/components/DetailCard/DetailCard';

export default function Page() {
  const router = useRouter();
  const { bookId, page } = router.query as { bookId: string; page: string };
  return (
    <Layout>
      <MainComponent />
      {bookId && <DetailCard page={page} id={bookId} />}
    </Layout>
  );
}
