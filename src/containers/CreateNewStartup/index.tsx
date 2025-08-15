'use client';
import React, { useState } from 'react';
import { create_startup_profile } from '@/apis/startup';
import { LanguagesSpoken } from '@/constants/common';
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
import { getSDGGoal } from '@/utils/getSDGGoal';
import provinces from '@/utils/data/provinces.json';
import sdgGoals from '@/utils/data/sdgGoals.json';
import { uploadProfilePicture } from '@/apis/upload';

const CreateNewStartup = () => {
  const [companyName, setCompanyName] = useState('');
  const [startupUsername, setStartupUsername] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | undefined>('');
  const [uploadedPictureId, setUploadedPictureId] = useState('');
  const [loading, setLoading] = useState(false);
  const [formedTime, setFormedTime] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState<LanguagesSpoken>(['EN']);

  const router = useRouter();

  const handleCancelCreateProfile = () => {
    router.back();
  };

  const handleChangeImage = async (file: File) => {
    try {
      setLoading(true);
      // Upload the file first
      const uploadResponse = await uploadProfilePicture(file, 'STARTUP');
      const fileUrl = uploadResponse.data.attachmentUrl;
      const fileId = uploadResponse.data.id;

      setProfilePicture(fileUrl);
      setUploadedPictureId(fileId);
    } catch (error) {
      addToast({
        title: 'Error uploading image',
        color: 'danger',
        timeout: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleChangeImage(file);
    }
  };

  const handleChangeStartupUsername = (startupName: string) => {
    const username = changeCase.snakeCase(startupName);
    setStartupUsername('@' + username);
  };

  const handleCreateProfile = async () => {
    const avtUrl = profilePicture || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
    if (!companyName.trim() || !startupUsername.trim() || !location || !avtUrl || !formedTime) {
      addToast({
        title: 'Please fill in all required fields',
        color: 'danger',
        timeout: 3000,
      });
      return;
    }

    const requestBody = {
      name: companyName,
      startupUsername: startupUsername,
      locationBased: location,
      sdgGoal: selectedGoal,
      description: description,
      avtUrl: avtUrl,
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
      if (uploadedPictureId) {
        updateAttachment({
          id: uploadedPictureId,
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

  // Inline HeaderSection component
  const HeaderSection = () => (
    <div className="flex flex-col items-center gap-2 w-full">
      <h1 className="text-[32px] font-bold text-black leading-[175%] text-center">
        Startup profile
      </h1>
      <p className="text-[20px] font-bold text-[#666666] leading-[160%] text-center">
        Access to your desired company
      </p>
    </div>
  );

  // Inline ProfilePictureUpload component
  const ProfilePictureUpload = () => {
    return (
      <div className="flex flex-col items-center gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="profile-picture"
        />
        <label htmlFor="profile-picture" className="cursor-pointer">
          <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition-colors">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile"
                width={90}
                height={90}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 text-black">
                {/* Camera icon placeholder */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                </svg>
              </div>
            )}
          </div>
        </label>
        <p className="text-[16px] font-bold text-[#010B23] leading-[150%] text-center">
          Upload your profile picture
        </p>
      </div>
    );
  };

  // Inline StartupNameSection component using Input component
  const StartupNameSection = () => (
    <div className="space-y-2">
      <label className="text-[16px] font-bold text-black leading-[150%]">Startup name</label>
      <Input
        variant="text"
        preset="default-md"
        value={companyName}
        onChange={(value) => {
          setCompanyName(value);
          handleChangeStartupUsername(value);
        }}
        placeholder="Enter name company"
        isRequired
      />
      <p className="text-[14px] font-normal text-[#71717A] leading-[143%]">
        Your profile could be found with username{' '}
        <span className="text-primary">{startupUsername || '@company_name'}</span>. You can change
        it later in Settings
      </p>
    </div>
  );

  // Inline LocationBasedSection component using Select component
  const LocationBasedSection = () => {
    const locationItems = provinces.map((province) => ({
      key: province.value,
      label: province.label,
      value: province.value,
    }));

    return (
      <div className="space-y-2">
        <label className="text-[16px] font-bold text-black leading-[150%]">Location based</label>
        <Select
          variant="form-field"
          placeholder="Search location"
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
          <p className="text-[14px] font-normal text-[#71717A] leading-[143%]">
            Selected: {getProvince(location)}
          </p>
        )}
      </div>
    );
  };

  // Inline DateEstablishedSection component
  const DateEstablishedSection = () => (
    <div className="space-y-2">
      <label className="text-[16px] font-bold text-black leading-[150%]">Date established</label>
      <input
        type="date"
        value={formedTime ? formedTime.toISOString().split('T')[0] : ''}
        onChange={(e) => setFormedTime(e.target.value ? new Date(e.target.value) : null)}
        className="h-12 border border-[#A3A3A3] bg-white rounded-lg px-3 text-[16px] w-full"
      />
    </div>
  );

  // Inline SDGGoalSection component using Select component
  const SDGGoalSection = () => {
    const goalItems = sdgGoals.map((goal) => ({
      key: goal.value,
      label: goal.label,
      value: goal.value,
    }));

    return (
      <div className="space-y-2">
        <label className="text-[16px] font-bold text-black leading-[150%]">SDG Goal</label>
        <Select
          variant="form-field"
          placeholder="Search goal"
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
          <p className="text-[14px] font-normal text-[#71717A] leading-[143%]">
            Selected: {getSDGGoal(selectedGoal)}
          </p>
        )}
      </div>
    );
  };

  // Inline ActionButtons component using Button component
  const ActionButtons = () => (
    <div className="flex flex-row justify-between w-full gap-4 h-12">
      <div className="flex-1">
        <Button
          variant="secondary-full"
          onClick={handleCancelCreateProfile}
          className="border border-primary text-primary bg-white hover:bg-gray-50"
        >
          Back
        </Button>
      </div>
      <div className="flex-1">
        <Button
          variant="primary-full"
          onClick={handleCreateProfile}
          className="bg-primary text-white hover:bg-primary-80"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col w-[736px] p-8 bg-white rounded-xl shadow-md space-y-8">
        <HeaderSection />
        <ProfilePictureUpload />
        <div className="space-y-6">
          <StartupNameSection />
          <LocationBasedSection />
          <DateEstablishedSection />
          <SDGGoalSection />
        </div>
        <ActionButtons />
      </div>
    </div>
  );
};

export default CreateNewStartup;
