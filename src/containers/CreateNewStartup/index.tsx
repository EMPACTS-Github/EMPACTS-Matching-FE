'use client';
import React, { useState } from 'react';
import { create_startup_profile } from '@/apis/startup';
import { LanguagesSpoken } from '@/constants/common';
import { addToast } from '@heroui/react';
import * as changeCase from 'change-case';
import { updateAttachment } from '@/apis/upload';
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { uploadProfilePicture } from '@/apis/upload';
import Header from './Header';
import ProfilePictureUpload from './ProfilePictureUpload';
import StartupNameSection from './StartupNameSection';
import Description from './Description';
import LanguagesSpokenSection from './LanguagesSpokenSection';
import DateEstablishedSection from './DateEstablishedSection';
import LocationBasedSection from './LocationBasedSection';
import SDGGoalSection from './SDGGoalSection';
import ActionButtons from './ActionButtons';

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

  return (
    <div className='w-full flex justify-center items-center relative'>
      {loading && (
        <div className='absolute inset-0 flex justify-center items-center bg-neutral-20 bg-opacity-75 z-50'>
          <div className='loader'></div>
        </div>
      )}
      <div
        className='custom-scrollbar flex flex-col w-[736px] p-8 bg-neutral-20 rounded-xl shadow-md space-y-8 my-6 overflow-auto'
        style={{
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
        <Header />
        <ProfilePictureUpload
          profilePictureUrl={profilePictureUrl}
          handleFileChange={handleFileChange}
        />
        <div className='space-y-6'>
          <StartupNameSection
            companyName={companyName}
            onSetCompanyName={setCompanyName}
            startupUsername={startupUsername}
            onChangeStartupUsername={handleChangeStartupUsername}
          />
          <LocationBasedSection location={location} onSetLocation={setLocation} />
          <DateEstablishedSection formedTime={formedTime} onSetFormedTime={setFormedTime} />
          <SDGGoalSection selectedGoal={selectedGoal} onSetSelectedGoal={setSelectedGoal} />
          <Description description={description} onSetDescription={setDescription} />
          <LanguagesSpokenSection
            languagesSpoken={languagesSpoken}
            onSetLanguagesSpoken={setLanguagesSpoken}
          />
        </div>
        <ActionButtons
          handleCancelCreateProfile={handleCancelCreateProfile}
          handleCreateProfile={handleCreateProfile}
        />
      </div>
    </div>
  );
};

export default CreateNewStartup;
