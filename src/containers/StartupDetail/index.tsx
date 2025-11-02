'use client';

import { useEffect, useState } from 'react';
import { Avatar, Skeleton, Divider, Tab, Tabs, Link } from '@heroui/react';
import { startup_detail } from '@/apis/startup';
import { Startup } from '@/interfaces/startup';
import { PROVINCES } from '@/constants/provinces';
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';

interface StartupDetailContainerProps {
  id: string;
}

const StartupDetailContainer = ({ id }: StartupDetailContainerProps) => {
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

  // Inline ProfileHeader component
  const ProfileHeader = () => (
    <div className='flex flex-col gap-large'>
      <div className='flex gap-semi-regular items-center'>
        <Avatar
          isBordered
          color='primary'
          className='w-[60px] h-[60px] bg-neutral-20'
          radius='full'
          src={startup?.avtUrl}
        />
        <div>
          <h1 className='text-2xl font-bold text-secondary'>{startup?.name}</h1>
          <p className='text-neutral-80'>{startup?.locationBased || 'Location not specified'}</p>
        </div>
      </div>
      <div className='flex gap-large'>
        <div className='flex items-center gap-1 overflow-hidden'>
          <Image src={LabelIcon} alt='Project' width={24} height={24} className='object-cover' />
          <span className='font-inter font-semibold text-base text-secondary text-center truncate'>
            {startup?.sdgGoal}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Image src={GroupIcon} alt='Members' width={24} height={24} className='object-cover' />
          <span className='font-inter font-semibold text-base text-secondary text-center'>
            {startup?.memberQty} {startup?.memberQty === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>
    </div>
  );

  // Inline TabsSection component
  const TabsSection = () => (
    <div className='flex-1 overflow-hidden'>
      <Tabs aria-label='Startup Tabs' variant='underlined' color='primary'>
        <Tab key='overview' title='Overview'>
          <div className='space-y-regular overflow-auto pr-small hide-scrollbar'>
            <div>
              <h4 className='text-lg font-semibold text-secondary'>Description</h4>
              <p className='text-neutral-80 text-sm whitespace-pre-line'>{startup?.description}</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold text-secondary'>Profile Link</h4>
              {startup?.profileLink ? (
                <p className='text-neutral-80 text-sm whitespace-pre-line'>
                  <Link isExternal showAnchorIcon href={startup?.startupLink}>
                    {startup?.startupLink}
                  </Link>
                </p>
              ) : (
                <p className='text-neutral-80 text-sm'>No profile link provided.</p>
              )}
            </div>
          </div>
        </Tab>
        <Tab key='media' title='Media'>
          <div className='p-regular h-full flex items-center justify-center'>
            <p className='text-sm text-neutral-80'>Not available yet.</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );

  // Loading state
  const isLoading = !startup;
  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full relative z-10 overflow-hidden'>
        <div className='w-[50vw] mx-auto p-large mt-medium rounded-lg bg-neutral-20 flex flex-col gap-large h-[80vh] overflow-hidden'>
          <Skeleton className='h-8 w-full rounded-full bg-neutral-40' />
          <Divider className='w-full' />
          <Skeleton className='h-8 w-full rounded-full bg-neutral-40' />
          <Skeleton className='h-8 w-full rounded-full bg-neutral-40' />
          <Skeleton className='h-8 w-full rounded-full bg-neutral-40' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center w-full relative z-10 overflow-hidden'>
      <div className='w-[50vw] mx-auto p-large mt-medium rounded-lg shadow-lg bg-neutral-20 flex flex-col gap-large h-[80vh] overflow-hidden'>
        <ProfileHeader />
        <TabsSection />
      </div>
    </div>
  );
};

export default StartupDetailContainer;
