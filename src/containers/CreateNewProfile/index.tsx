'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import RightArrow from '/public/assets/arrow-right.svg';
import Image from 'next/image';
import Button from '@/components/Button/Button';

function CreateNewProfile() {
  const router = useRouter();

  const handleChooseOption = (link: string) => {
    router.push(link);
  };

  const ProfileHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="p-4 text-center mb-6">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );

  const ProfileOption = ({ title, description, link }: { title: string; description: string; link: string }) => (
    <Button
      variant="ghost-full"
      className="justify-between p-4 py-8 border-b border-gray-200 hover:bg-gray-50"
      onClick={() => handleChooseOption(link)}
    >
      <div className="flex items-center flex-1">
        <div className="ml-4 text-left">
          <p className="font-bold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Image 
        src={RightArrow} 
        className="text-gray-400 text-lg" 
        alt="Arrow right" 
        width={24} 
        height={24} 
      />
    </Button>
  );

  return (
    <div className="flex justify-center items-center w-full mt-16">
      <div className="max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col">
        <ProfileHeader title="Create Profile" subtitle="Choose your new profile type" />
        <div className="flex-1 flex flex-col space-y-4">
          <ProfileOption
            title="Mentor"
            description="I want to guide startups"
            link="/profiles/new/mentor"
          />
          <ProfileOption
            title="Startup"
            description="I want to build a business"
            link="/profiles/new/startup"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNewProfile;
