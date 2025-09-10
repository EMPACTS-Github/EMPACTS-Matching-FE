/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback, useState } from 'react';
import { create_startup_profile } from '@/apis/startup';
import { LanguagesSpoken, LANGUAGE_SPOKEN } from '@/constants/common';
import { addToast } from '@heroui/react';
import * as changeCase from 'change-case';
import { updateAttachment } from '@/apis/upload';
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Image from 'next/image';
import { getProvince } from '@/utils/getProvince';
import provinces from '@/utils/data/provinces.json';
import { uploadProfilePicture } from '@/apis/upload';
import FormLabel from '@/components/Form/FormLabel';
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';

// Inline HeaderSection component
const HeaderSection = () => (
  <div className='flex flex-col items-center gap-2 w-full'>
    <h1 className='text-large font-bold text-secondary leading-[175%] text-center'>
      Startup profile
    </h1>
    <p className='text-regular font-bold text-neutral-80 leading-[160%] text-center'>
      Access to your desired company
    </p>
  </div>
);

const CameraIcon = () => (
  <div className='w-6 h-6 text-secondary'>
    {/* Camera icon placeholder */}
    <svg viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z' />
      <path d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' />
    </svg>
  </div>
);

const StartupNameSection = ({
  companyName,
  onSetCompanyName,
  onChangeStartupUsername,
  startupUsername
}: {
  companyName: string,
  onSetCompanyName: (value: string) => void,
  onChangeStartupUsername: (value: string) => void,
  startupUsername: string
}) => (
  <div className='space-y-2'>
    <FormLabel
      text='Startup name'
      className='text-regular font-bold text-secondary leading-[150%]'
    />
    <Input
      variant='text'
      preset='default-md'
      value={companyName}
      onChange={(value) => {
        onSetCompanyName(value);
        onChangeStartupUsername(value);
      }}
      placeholder='Enter name company'
      isRequired
    />
    <p className='text-small font-normal text-neutral-80 leading-[143%]'>
      Your profile could be found with username{' '}
      <span className='text-primary'>{startupUsername || '@company_name'}</span>. You can change
      it later in Settings
    </p>
  </div>
);

const DescriptionSection = ({
  description,
  onSetDescription
}: {
  description: string,
  onSetDescription: (value: string) => void,
}) => (
  <div className='space-y-2'>
    <FormLabel
      text='Description'
      className='text-regular font-bold text-secondary leading-[150%]'
    />
    <textarea
      value={description}
      onChange={(e) => onSetDescription(e.target.value)}
      placeholder='Enter company description'
      className='h-24 border border-neutral-50 bg-neutral-20 rounded-lg px-3 py-2 text-regular w-full resize-none'
      rows={4}
    />
  </div>
);

 const LanguagesSpokenSection = ({
  languagesSpoken,
  onSetLanguagesSpoken,
 }: {
  languagesSpoken: string[],
  onSetLanguagesSpoken: (values: LanguagesSpoken) => void,
 }) => {
  const languageItems = Object.entries(LANGUAGE_SPOKEN).map(([key, label]) => ({
    key,
    label,
    value: key,
  }));

  return (
    <div className='space-y-2'>
      <FormLabel
        text='Languages Spoken'
        className='text-regular font-bold text-secondary leading-[150%]'
      />
      <Select
        variant='form-field'
        placeholder='Select languages'
        items={languageItems}
        selectedKeys={languagesSpoken}
        onSelectionChange={(keys) => {
          if (keys !== 'all') {
            onSetLanguagesSpoken(Array.from(keys) as LanguagesSpoken);
          }
        }}
        selectionMode='multiple'
      />
    </div>
  );
};

const CreateNewStartup = () => {
  const [companyName, setCompanyName] = useState('');
  const [startupUsername, setStartupUsername] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [location, setLocation] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>('');
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formedTime, setFormedTime] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState<LanguagesSpoken>(['EN']);

  const router = useRouter();

  const handleCancelCreateProfile = () => {
    router.back();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (profilePictureUrl) {
      URL.revokeObjectURL(profilePictureUrl);
    }

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfilePictureUrl(fileUrl);
      setProfilePictureFile(file);
      e.target.files = null;
    }
  };

  const handleChangeStartupUsername = (startupName: string) => {
    const username = changeCase.snakeCase(startupName);
    setStartupUsername('@' + username);
  };

  const handleCreateProfile = async () => {
    let avtUrl = profilePictureUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
    if (!companyName.trim() || !startupUsername.trim() || !location || !avtUrl || !formedTime) {
      addToast({
        title: 'Please fill in all required fields',
        color: 'danger',
        timeout: 3000,
      });
      return;
    }

    let uploadAvatarId: string = '';
    if (profilePictureFile) {
      try {
        const uploadAvatarResult: any = await uploadProfilePicture(profilePictureFile, 'STARTUP');
        uploadAvatarId = uploadAvatarResult.data.id;
        avtUrl = uploadAvatarResult.data.attachmentUrl;
      } catch (error) {
        addToast({
          title: 'Error uploading image',
          color: 'danger',
          timeout: 3000,
        });
        return;
      }
    }

    const requestBody = {
      name: companyName,
      startupUsername: startupUsername,
      locationBased: location,
      sdgGoal: selectedGoal,
      description: description,
      avtUrl: avtUrl as string,
      formedTime: formedTime,
      languagesSpoken: languagesSpoken,
    };

    setLoading(true);

    try {
      const response = await create_startup_profile(requestBody);
      addToast({
        title: 'Profile created successfully',
        color: 'success',
        timeout: 3000,
      });
      router.push(`/startup-detail/${response.data.newStartup.id}`);

      // Update attachment ownership if we uploaded a new picture
      if (uploadAvatarId) {
        updateAttachment({
          id: uploadAvatarId,
          ownerId: response.data.newStartup.id,
          ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        });
      }
    } catch (error) {
      addToast({
        title: 'Error creating profile',
        color: 'danger',
        timeout: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getSDGGoalLabel = (goalKey: string) => {
    const goal = Object.values(STARTUP_SDG_GOALS).find((g) => g.textValue === goalKey);
    return goal?.label || goalKey;
  };

  // Inline ProfilePictureUpload component
  const ProfilePictureUpload = useCallback(() => {
    return (
      <div className='flex flex-col items-center gap-5'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
          id='profile-picture'
        />
        <label htmlFor='profile-picture' className='cursor-pointer flex justify-center'>
          <div className='w-[12%] h-[12%] relative min-w-20 min-h-20 rounded-full bg-neutral-40 flex items-center justify-center overflow-hidden hover:bg-neutral-50 transition-colors'>
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt='Profile'
                className='w-full h-full object-cover'
                fill
              />
            ) : (
              <CameraIcon />
            )}
          </div>
        </label>
        <p className='text-regular font-bold text-secondary leading-[150%] text-center'>
          Upload your profile picture
        </p>
      </div>
    );
  }, [profilePictureUrl]);



  // Inline LocationBasedSection component using Select component
  const LocationBasedSection = useCallback(() => {
    const locationItems = provinces.map((province) => ({
      key: province.value,
      label: province.label,
      value: province.value,
    }));

    return (
      <div className='space-y-2'>
        <FormLabel
          text='Location based'
          className='text-regular font-bold text-secondary leading-[150%]'
        />
        <Select
          variant='form-field'
          placeholder='Search location'
          items={locationItems}
          selectedKeys={location ? [location] : []}
          onSelectionChange={(keys) => {
            if (keys !== 'all' && keys.size > 0) {
              const selectedKey = Array.from(keys)[0];
              setLocation(selectedKey.toString());
            }
          }}
          isRequired
        />
        {location && (
          <p className='text-small font-normal text-neutral-80 leading-[143%]'>
            Selected: {getProvince(location)}
          </p>
        )}
      </div>
    );
  }, [location])

  // Inline DateEstablishedSection component
  const DateEstablishedSection = useCallback(() => (
    <div className='space-y-2'>
      <FormLabel
        text='Date established'
        className='text-regular font-bold text-secondary leading-[150%]'
      />
      <input
        type='date'
        value={formedTime ? formedTime.toISOString().split('T')[0] : ''}
        onChange={(e) => setFormedTime(e.target.value ? new Date(e.target.value) : null)}
        className='h-12 border border-neutral-50 bg-neutral-20 rounded-lg px-3 text-regular w-full'
      />
    </div>
  ), [formedTime]);

  // Inline SDGGoalSection component using Select component
  const SDGGoalSection = useCallback(() => {
    const goalItems = Object.entries(STARTUP_SDG_GOALS).map(([key, goal]) => ({
      key: goal.textValue,
      label: goal.label,
      value: goal.textValue,
    }));

    return (
      <div className='space-y-2'>
        <FormLabel
          text='SDG Goal'
          className='text-regular font-bold text-secondary leading-[150%]'
        />
        <Select
          variant='form-field'
          placeholder='Search goal'
          items={goalItems}
          selectedKeys={selectedGoal ? [selectedGoal] : []}
          onSelectionChange={(keys) => {
            if (keys !== 'all' && keys.size > 0) {
              const selectedKey = Array.from(keys)[0];
              setSelectedGoal(selectedKey.toString());
            }
          }}
        />
        {selectedGoal && (
          <p className='text-small font-normal text-neutral-80 leading-[143%]'>
            Selected: {getSDGGoalLabel(selectedGoal)}
          </p>
        )}
      </div>
    );
  }, [selectedGoal]);

  // Inline ActionButtons component using Button component
  const ActionButtons = useCallback(() => (
    <div className='flex flex-row justify-between w-full gap-4 h-12'>
      <div className='flex-1'>
        <Button
          variant='secondary-full'
          onClick={handleCancelCreateProfile}
          className='border border-primary text-primary bg-neutral-20 hover:bg-neutral-40'
        >
          Back
        </Button>
      </div>
      <div className='flex-1'>
        <Button
          variant='primary-full'
          onClick={handleCreateProfile}
          className='bg-primary text-neutral-20 hover:bg-primary-80'
        >
          Continue
        </Button>
      </div>
    </div>
  ), []);

  return (
    <div className='w-full flex justify-center items-center min-h-screen relative'>
      {loading && (
        <div className='absolute inset-0 flex justify-center items-center bg-neutral-20 bg-opacity-75 z-50'>
          <div className='loader'></div>
        </div>
      )}
      <div className='flex flex-col w-[736px] p-8 bg-neutral-20 rounded-xl shadow-md space-y-8'>
        <HeaderSection />
        <ProfilePictureUpload />
        <div className='space-y-6'>
          <StartupNameSection
            companyName={companyName}
            onSetCompanyName={setCompanyName}
            startupUsername={startupUsername}
            onChangeStartupUsername={handleChangeStartupUsername}
          />
          <LocationBasedSection />
          <DateEstablishedSection />
          <SDGGoalSection />
          <DescriptionSection
            description={description}
            onSetDescription={setDescription}
          />
          <LanguagesSpokenSection
            languagesSpoken={languagesSpoken}
            onSetLanguagesSpoken={setLanguagesSpoken}
          />
        </div>
        <ActionButtons />
      </div>
    </div>
  );
};

export default CreateNewStartup;
