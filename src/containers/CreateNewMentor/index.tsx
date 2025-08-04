"use client";
import React, { useState } from 'react';
import { create_mentor_profile } from '@/apis/mentor';
import { LanguagesSpoken } from '@/constants/common';
import { SkillOffered } from '@/constants/skillOffered';
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
import ImageUploadWithLabel from '@/components/FormInput/ImageUploadWithLabel';
import AuthButton from '@/components/common/AuthButton';
import UploadAvatar from "/public/assets/upload_avatar.svg";
import provinces from '@/utils/data/provinces.json';
import sdgGoals from '@/utils/data/sdgGoals.json';
import languages from '@/utils/data/languages.json';
import skill_offered from '@/utils/data/skillOffered.json';

function CreateNewMentor() {
  const [mentorName, setMentorName] = useState('');
  const [mentorUsername, setMentorUsername] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | undefined>('');
  const [uploadedPictureId, setUploadedPictureId] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState<LanguagesSpoken>(['EN']);
  const [skillOffered, setSkillOffered] = useState<SkillOffered>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const router = useRouter();

  const handleCancelCreateProfile = () => {
    router.back();
  }

  const handleChangeImage = (fileUrl: string, fileId: string) => {
    setProfilePicture(fileUrl);
    setUploadedPictureId(fileId);
  }

  const handleChangeMentorUsername = (mentorName: string) => {
    const username = changeCase.snakeCase(mentorName);
    setMentorUsername('@' + username);
  }

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  }

  const handleLanguagesSpokenChange = (newLanguages: LanguagesSpoken) => {
    setLanguagesSpoken(newLanguages);
  }

  const handleSkillOfferedChange = (newSkills: SkillOffered) => {
    setSkillOffered(newSkills);
  }

  const handleCreateProfile = async () => {
    const avtUrl = profilePicture || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
    if (
      !mentorName.trim() ||
      !mentorUsername.trim() ||
      !location ||
      !avtUrl ||
      !description.trim() ||
      !languagesSpoken.length ||
      !skillOffered.length ||
      !selectedGoals.length
    ) {
      console.log(mentorName.trim())
      console.log(mentorUsername.trim())
      console.log(location)
      console.log(avtUrl)
      console.log(description.trim())
      console.log(languagesSpoken.length)
      console.log(skillOffered.length)
      console.log(selectedGoals.length)
      addToast({
        title: 'Please fill in all required fields.',
        color: 'danger',
        timeout: 3000,
      });
      return;
    }

    setLoading(true);
    const requestBody = {
      name: mentorName,
      mentorUsername: mentorUsername,
      locationBased: location,
      sdgFocusExpertises: selectedGoals,
      avtUrl: avtUrl,
      description: description,
      skillOffered: skillOffered,
      languagesSpoken: languagesSpoken,
    };

    try {
      const response = await create_mentor_profile(requestBody);
      addToast({
        title: 'Profile created successfully',
        color: 'success',
        timeout: 3000,
      });
      router.push(`/mentor-detail/${response.data.newMentor.id}`);

      updateAttachment({
        id: uploadedPictureId,
        ownerId: response.data.newMentor.id,
        ownerType: UPLOAD_OWNER_TYPE.MENTOR,
      });

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

  const helperText = `Your profile could be found with username ${mentorUsername !== '' ? mentorUsername : '@mentor_name'}. You can change it later in Settings`;

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative">
      <LoadingOverlay isVisible={loading} />
      <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-[28px] font-bold text-secondary leading-[109%] text-center">
            Mentor profile
          </h1>
          <p className="text-sm text-empacts-grey-100 leading-[120%] text-center">
            Access to your desired mentor
          </p>
        </div>

        {/* Profile Picture Upload */}
        <ImageUploadWithLabel
          label="Upload a mentor profile picture"
          onImageUpload={handleChangeImage}
          defaultImage={UploadAvatar}
          ownerType={UPLOAD_OWNER_TYPE.MENTOR}
        />

        {/* Mentor Name */}
        <FormFieldWithLabel
          label="Mentor name"
          value={mentorName}
          onChange={(value) => {
            setMentorName(value);
            handleChangeMentorUsername(value);
          }}
          placeholder="Mentor name"
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

        {/* Skill Offered */}
        <FormMultiSelectWithLabel
          label="Skill Offered"
          value={skillOffered}
          onChange={(value) => handleSkillOfferedChange(value as SkillOffered)}
          options={skill_offered}
          placeholder="Select Skill Offered"
          required
        />

        {/* SDG Goals */}
        <FormMultiSelectWithLabel
          label="SDG Goals"
          value={selectedGoals}
          onChange={setSelectedGoals}
          options={sdgGoals}
          placeholder="Select SDG Goals"
          required
        />

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

export default CreateNewMentor
