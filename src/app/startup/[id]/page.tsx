'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { startup_detail } from '@/apis/startup';
import ProfileHeader from '@/components/StartupDetail/ProfileHeader';
import TabsSection from '@/components/StartupDetail/TabsSection';
import { Startup } from '@/interfaces/startup';
import { PROVINCES } from '@/constants/provinces';
import { Skeleton } from '@heroui/skeleton';
import { Divider } from '@heroui/react';

const StartupDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await startup_detail(id);

        if (response.data && response.data.locationBased) {
          const province = PROVINCES.find((p) => p.key === response.data.locationBased);

          if (province) {
            response.data.locationBased = province.label;
          }
        }

        setStartup(response.data);
      } catch (error) {
        console.error('Error fetching startup details:', error);
      }
    };

    fetchStartup();
  }, [id]);

  const isLoading = !startup;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full relative z-10 overflow-hidden">
        <div className="w-[50vw] mx-auto p-8 mt-10 rounded-lg bg-white flex flex-col gap-7 h-[80vh] overflow-hidden">
          <Skeleton className="h-8 w-full rounded-full bg-default-300" />
          <Divider className="w-full" />
          <Skeleton className="h-8 w-full rounded-full bg-default-300" />
          <Skeleton className="h-8 w-full rounded-full bg-default-300" />
          <Skeleton className="h-8 w-full rounded-full bg-default-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full relative z-10 overflow-hidden">
      <div className="w-[50vw] mx-auto p-8 mt-10 rounded-lg shadow-lg bg-white flex flex-col gap-7 h-[80vh] overflow-hidden">
        <ProfileHeader startup={startup} />
        <TabsSection startup={startup} />
      </div>
    </div>
  );
};

export default StartupDetailPage;
