'use client';
import { useParams } from 'next/navigation';
import StartupDetailContainer from '@/containers/StartupDetail';

const StartupDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <StartupDetailContainer id={id} />;
};

export default StartupDetailPage;
