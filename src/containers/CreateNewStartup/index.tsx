"use client";
import React, { useState } from 'react';
import { create_startup_profile, invite_list_member } from '@/apis/startup';
import { MemberForInvite } from '@/interfaces/startup';
import { LanguagesSpoken } from '@/constants/common';
import { addToast } from '@heroui/react';
import * as changeCase from "change-case";
import { updateAttachment } from "@/apis/upload";
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import FormFieldWithLabel from '@/components/FormInput/FormFieldWithLabel';
import FormTextareaWithLabel from '@/components/FormInput/FormTextareaWithLabel';
import FormSelectWithLabel from '@/components/FormInput/FormSelectWithLabel';
import FormMultiSelectWithLabel from '@/components/FormInput/FormMultiSelectWithLabel';
import FormDatePickerWithLabel from '@/components/FormInput/FormDatePickerWithLabel';
import ImageUploadWithLabel from '@/components/FormInput/ImageUploadWithLabel';
import MemberInputForm from '@/components/common/MemberInputForm';
import MemberList from '@/components/common/MemberList';
import AuthButton from '@/components/common/AuthButton';
import UploadAvatar from "/public/assets/upload_avatar.svg";
import provinces from '@/utils/data/provinces.json';
import sdgGoals from '@/utils/data/sdgGoals.json';
import languages from '@/utils/data/languages.json';

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
  };

  const handleAddMember = (email: string, title: string): boolean => {
    const userInfo = JSON.parse(localStorage.getItem('user') as string);
    
    // Check user already in a startup
    if (email === userInfo.email) {
      return false;
    }

    // Check this user already invited
    const invitedEmails = members.map((member) => member.email);
    if (invitedEmails.includes(email)) {
      return false;
    }

    setMembers([...members, { email, title }]);
    return true;
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

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

  const helperText = `Your profile could be found with username ${startupUsername !== '' ? startupUsername : '@company_name'}. You can change it later in Settings`;

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative">
      <LoadingOverlay isVisible={loading} />
      <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-[28px] font-bold text-secondary leading-[109%] text-center">
            Startup profile
          </h1>
          <p className="text-sm text-empacts-grey-100 leading-[120%] text-center">
            Access to your desired company
          </p>
        </div>

        {/* Profile Picture Upload */}
        <ImageUploadWithLabel
          label="Upload a startup profile picture"
          onImageUpload={handleChangeImage}
          defaultImage={UploadAvatar}
          ownerType={UPLOAD_OWNER_TYPE.STARTUP}
        />

        {/* Startup Name */}
        <FormFieldWithLabel
          label="Startup name"
          value={companyName}
          onChange={(value) => {
            setCompanyName(value);
            handleChangeStartupUsername(value);
          }}
          placeholder="Company name"
          helperText={helperText}
          required
        />

        {/* Location Based */}
        <FormSelectWithLabel
          label="Location Based"
          value={location}
          onChange={setLocation}
          options={provinces}
          placeholder="Select a location"
          required
        />

        {/* Date Established */}
        <FormDatePickerWithLabel
          label="Date established"
          value={formedTime}
          onChange={handleFormedTimeChange}
          required
        />

        {/* Description */}
        <FormTextareaWithLabel
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Add your description here..."
          rows={6}
          required
        />

        {/* Languages Spoken */}
        <FormMultiSelectWithLabel
          label="Languages Spoken"
          value={languagesSpoken}
          onChange={(value) => handleLanguagesSpokenChange(value as LanguagesSpoken)}
          options={languages}
          placeholder="Select languages"
          required
        />

        {/* SDG Goal */}
        <FormSelectWithLabel
          label="SDG Goal"
          value={selectedGoal}
          onChange={handleGoalChange}
          options={sdgGoals}
          placeholder="Select an SDG Goal"
        />

        {/* Add Member */}
        <MemberInputForm onAddMember={handleAddMember} />
        <MemberList members={members} onRemoveMember={handleRemoveMember} />

        {/* Action Buttons */}
        <div className="flex flex-row justify-between w-full gap-8 h-12">
          <div className="flex-1">
            <AuthButton
              onClick={handleCancelCreateProfile}
              variant="bordered"
              color="default"
              className="w-full h-[48px] border border-secondary bg-white text-black"
            >
              <span className="text-base font-medium">Cancel</span>
            </AuthButton>
          </div>
          <div className="flex-1">
            <AuthButton
              onClick={handleCreateProfile}
              className="w-full h-[48px]"
            >
              <span className="text-base font-medium">Create New</span>
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewStartup
