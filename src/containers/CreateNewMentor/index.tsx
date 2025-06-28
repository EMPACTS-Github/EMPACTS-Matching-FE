"use client";
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import ProfilePictureUpload from './ProfilePictureUpload';
import MentorNameSection from './MentorNameSection';
import LocationBasedSection from './LocationBasedSection';
import SDGGoalSection from './SDGGoalSection';
import ActionButtons from './ActionButtons';
import { create_mentor_profile } from '@/apis/mentor';
import { LanguagesSpoken } from '@/constants/common';
import { SkillOffered } from '@/constants/skillOffered';
import { addToast } from '@heroui/react';
import * as changeCase from "change-case";
import { PROVINCES } from '@/constants/provinces';
import { updateAttachment } from "@/apis/upload";
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import LanguagesSpokenSection from './LanguagesSpokenSection';
import DescriptionSection from './DescriptionSection';
import SkillOfferedSection from './SkillOfferedSection';

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
        <MentorNameSection
          mentorName={mentorName}
          mentorUsername={mentorUsername}
          onMentorNameChange={setMentorName}
          onChangeMentorUsername={handleChangeMentorUsername}
        />
        <LocationBasedSection selectedLocation={location} onChange={setLocation} />
        <DescriptionSection
          description={description}
          onDescriptionChange={handleDescriptionChange}
        />
        <LanguagesSpokenSection
          languagesSpoken={languagesSpoken}
          onLanguagesSpokenChange={handleLanguagesSpokenChange}
        />
        <SkillOfferedSection
          skillOffered={skillOffered}
          onSkillOfferedChange={handleSkillOfferedChange}
        />
        <SDGGoalSection
          selectedGoals={selectedGoals}
          onGoalsChange={setSelectedGoals}
        />
        <ActionButtons onCancel={handleCancelCreateProfile} onCreate={handleCreateProfile} />
      </div>
    </div>
  )
}

export default CreateNewMentor