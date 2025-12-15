'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import ArrowRightIcon from '@/components/Icons/ArrowRightIcon';
import { mentor_list } from '@/apis/mentor-profile';
import { addToast } from '@heroui/react';
import { TOAST_COLORS, TOAST_MESSAGES, TOAST_TIMEOUT } from '@/constants/api';

const CreateNewProfile = () => {
  const router = useRouter();

  const handleChooseOption = async (link: string) => {
    const isMentorLink = link === '/profiles/new/mentor';

    if (isMentorLink) {
      try {
        const mentorProfiles = await mentor_list();
        const mentorCount = mentorProfiles?.data?.length || 0;

        if (mentorCount >= 1) {
          addToast({
            title: TOAST_MESSAGES.MENTOR_PROFILE_LIMIT,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
          return;
        }
      } catch (error) {
        console.error('Failed to check mentor profiles:', error);
        addToast({
          title: TOAST_MESSAGES.REQUEST_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
        return;
      }
    }

    router.push(link);
  };

  const ProfileHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className='p-4 text-center mb-6'>
      <h3 className='text-xl font-bold text-gray-800'>{title}</h3>
      <p className='text-gray-500 text-sm'>{subtitle}</p>
    </div>
  );

  const ProfileOption = ({
    title,
    description,
    link,
  }: {
    title: string;
    description: string;
    link: string;
  }) => (
    <Button
      variant='ghost-full'
      className='justify-between p-4 py-8 border-b border-gray-200 hover:bg-gray-50'
      onClick={() => handleChooseOption(link)}
    >
      <div className='flex items-center flex-1'>
        <div className='ml-4 text-left'>
          <p className='font-bold text-gray-800'>{title}</p>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
      </div>
      <ArrowRightIcon className='text-gray-400 text-lg' width={24} height={24} />
    </Button>
  );

  return (
    <div className='flex justify-center items-center w-full mt-16'>
      <div className='max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col'>
        <ProfileHeader title='Create Profile' subtitle='Choose your new profile type' />
        <div className='flex-1 flex flex-col space-y-4'>
          <ProfileOption
            title='Mentor'
            description='I want to guide startups'
            link='/profiles/new/mentor'
          />
          <ProfileOption
            title='Startup'
            description='I want to build a business'
            link='/profiles/new/startup'
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNewProfile;
