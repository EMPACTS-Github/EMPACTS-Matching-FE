"use client";
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import ProfilePictureUpload from './ProfilePictureUpload';
import StartupNameSection from './StartupNameSection';
import LocationBasedSection from './LocationBasedSection';
import SDGGoalSection from './SDGGoalSection';
import AddMemberSection from './AddMemberSection';
import ActionButtons from './ActionButtons';
import { create_startup_profile, invite_list_member } from '@/apis/startup';
import { MemberForInvite } from '@/interfaces/startup';
import { LanguagesSpoken } from '@/constants/common';
import { addToast } from '@heroui/react';
import * as changeCase from "change-case";
import { updateAttachment } from "@/apis/upload";
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import LanguagesSpokenSection from './LanguagesSpokenSection';
import FormedTimeSection from './FormedTimeSection';
import DescriptionSection from './DescriptionSection';

function CreateNewStartup() {
  const [companyName, setCompanyName] = useState('');
  const [startupUsername, setStartupUsername] = useState('');
  const [selectedGoal, setSelectedGoal] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | undefined>('');
  const [uploadedPictureId, setUploadedPictureId] = useState('');
  const [members, setMembers] = useState<MemberForInvite[]>([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [formedTime, setFormedTime] = useState<Date | null>(null);
  const [languagesSpoken, setLanguagesSpoken] = useState<LanguagesSpoken>(['EN']);

  const router = useRouter();

  const handleCancelCreateProfile = () => {
    router.back();
  }

  const handleGoalChange = (newGoal: string) => {
    setSelectedGoal(newGoal);
  }

  const handleChangeImage = (fileUrl: string, fileId: string) => {
    setProfilePicture(fileUrl);
    setUploadedPictureId(fileId);
  }

  const handleChangeStartupUsername = (startupName: string) => {
    const username = changeCase.snakeCase(startupName);
    setStartupUsername('@' + username);
  }

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  }

  const handleFormedTimeChange = (newFormedTime: Date | null) => {
    setFormedTime(newFormedTime);
  }

  const handleLanguagesSpokenChange = (newLanguages: LanguagesSpoken) => {
    setLanguagesSpoken(newLanguages);
  }

  const handleCreateProfile = async () => {
    const avtUrl = profilePicture || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
    if (
      !companyName.trim() ||
      !startupUsername.trim() ||
      !location ||
      !avtUrl ||
      !description.trim() ||
      !languagesSpoken.length ||
      !formedTime
    ) {
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
      avtUrl: avtUrl,
      description: description,
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
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : {};
      const inviterEmail = userObj.email;

      if (uploadedPictureId) {
        updateAttachment({
          id: uploadedPictureId,
          ownerId: undefined,
          ownerType: UPLOAD_OWNER_TYPE.STARTUP
        });
      }

      if (members.length !== 0) {
        invite_list_member({
          invitee: members,
          inviterEmail: inviterEmail,
          startupId: response.data.newStartup.id,
        }).then(() => {
          addToast({
            title: 'Members invited successfully',
            color: 'success',
            timeout: 3000,
          });
        }).catch(() => {
          addToast({
            title: 'Error inviting members',
            color: 'danger',
            timeout: 5000,
          });
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
    <div className="w-full flex justify-center items-center min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
        <HeaderSection />
        <ProfilePictureUpload onImageUpload={handleChangeImage} />
        <StartupNameSection
          companyName={companyName}
          startupUsername={startupUsername}
          onCompanyNameChange={setCompanyName}
          onChangeStartupUsername={handleChangeStartupUsername}
        />
        <LocationBasedSection selectedLocation={location} onChange={setLocation} />
        <FormedTimeSection
          formedTime={formedTime}
          onFormedTimeSelect={handleFormedTimeChange} />
        <DescriptionSection
          description={description}
          onDescriptionChange={handleDescriptionChange}
        />
        <LanguagesSpokenSection
          languagesSpoken={languagesSpoken}
          onLanguagesSpokenChange={handleLanguagesSpokenChange}
        />
        <SDGGoalSection
          selectedGoal={selectedGoal}
          onGoalChange={handleGoalChange}
        />
        <AddMemberSection members={members} setMembers={setMembers} />
        <ActionButtons onCancel={handleCancelCreateProfile} onCreate={handleCreateProfile} />
      </div>
    </div>
  )
}

export default CreateNewStartup