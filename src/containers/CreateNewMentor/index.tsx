'use client';
import React, { useState } from 'react';
import { create_mentor_profile } from '@/apis/mentor';
import { LanguagesSpoken, LANGUAGE_SPOKEN, SDGS } from '@/constants/common';
import { MENTOR_SKILL_OFFERED, SkillOffered } from '@/constants/skillOffered';
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';
import { addToast } from '@heroui/react';
import * as changeCase from 'change-case';
import { updateAttachment } from '@/apis/upload';
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import LabelWithTextarea from '@/components/Input/LabelWithTextarea';
import { TOAST_COLORS, TOAST_MESSAGES, TOAST_TIMEOUT } from '@/constants/api';
import Image from 'next/image';
import { getProvince } from '@/utils/getProvince';
import provinces from '@/utils/data/provinces.json';
import { uploadProfilePicture } from '@/apis/upload';
import FormLabel from '@/components/Form/FormLabel';
import TextLine from '@/components/common/TextLine';

const CreateNewMentor = () => {
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
  const [phone, setPhone] = useState('');

  const router = useRouter();

  const handleCancelCreateProfile = () => {
    router.back();
  };

  const handleChangeImage = async (file: File) => {
    try {
      setLoading(true);
      // Upload the file first
      const uploadResponse = await uploadProfilePicture(file, 'MENTOR');
      const fileUrl = uploadResponse.data.attachmentUrl;
      const fileId = uploadResponse.data.id;

      setProfilePicture(fileUrl);
      setUploadedPictureId(fileId);
    } catch (error) {
      addToast({
        title: 'Error uploading image',
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.SHORT,
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

  const handleChangeMentorUsername = (mentorName: string) => {
    const username = changeCase.snakeCase(mentorName);
    setMentorUsername('@' + username);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleLanguagesSpokenChange = (newLanguages: LanguagesSpoken) => {
    setLanguagesSpoken(newLanguages);
  };

  const handleSkillOfferedChange = (newSkills: SkillOffered) => {
    setSkillOffered(newSkills);
  };

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
      addToast({
        title: TOAST_MESSAGES.PROFILE_CREATE_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.SHORT,
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
      phone: phone || undefined,
    };

    try {
      const response = await create_mentor_profile(requestBody);
      addToast({
        title: 'Profile created successfully',
        color: TOAST_COLORS.SUCCESS,
        timeout: TOAST_TIMEOUT.SHORT,
      });
      router.push(`/mentor-detail/${response.data.newMentor.id}`);

      // Update attachment ownership if we uploaded a new picture
      if (uploadedPictureId) {
        updateAttachment({
          id: uploadedPictureId,
          ownerId: response.data.newMentor.id,
          ownerType: UPLOAD_OWNER_TYPE.MENTOR,
        });
      }
    } catch (error) {
      addToast({
        title: TOAST_MESSAGES.PROFILE_CREATE_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
      });
    } finally {
      setLoading(false);
    }
  };

  const getSDGGoalLabel = (goalKey: string) => {
    const goal = Object.values(STARTUP_SDG_GOALS).find((g) => g.textValue === goalKey);
    return goal?.label || goalKey;
  };

  const CameraIcon = () => (
    <div className="w-6 h-6 text-secondary">
      {/* Camera icon placeholder */}
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    </div>
  );

  // Inline HeaderSection component
  const HeaderSection = () => (
    <div className="flex flex-col items-center gap-2 w-full">
      <h1 className="text-large font-bold text-secondary leading-[175%] text-center">
        Mentor profile
      </h1>
      <TextLine
        text="Bring your knowledge to the world"
        className="text-neutral-500 text-small font-normal"
      />
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
          <div className="w-[12%] h-[12%] min-w-20 min-h-20 rounded-full bg-neutral-40 flex items-center justify-center overflow-hidden hover:bg-neutral-50 transition-colors">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile"
                width={90}
                height={90}
                className="w-full h-full object-cover"
              />
            ) : (
              <CameraIcon />
            )}
          </div>
        </label>
        <p className="text-regular font-bold text-secondary leading-[150%] text-center">
          Upload your profile picture
        </p>
      </div>
    );
  };

  // Inline MentorNameSection component using Input component
  const MentorNameSection = () => (
    <div className="space-y-2">
      <FormLabel
        text="Mentor name"
        className="text-regular font-bold text-secondary leading-[150%]"
      />
      <Input
        variant="text"
        preset="default-md"
        value={mentorName}
        onChange={(value) => {
          setMentorName(value);
          handleChangeMentorUsername(value);
        }}
        placeholder="Mentor name"
        isRequired
      />
      <p className="text-small font-normal text-neutral-80 leading-[143%]">
        Your profile could be found with username{' '}
        <span className="text-primary">{mentorUsername || '@mentor_name'}</span>. You can change it
        later in Settings
      </p>
    </div>
  );

  // Inline PhoneSection component
  const PhoneSection = () => (
    <div className="space-y-2">
      <FormLabel text="Phone" className="text-regular font-bold text-secondary leading-[150%]" />
      <Input
        variant="text"
        preset="default-md"
        value={phone}
        onChange={setPhone}
        placeholder="Enter phone number"
      />
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
        <FormLabel
          text="Location Based"
          className="text-regular font-bold text-secondary leading-[150%]"
        />
        <Select
          variant="form-field"
          placeholder="Select a location"
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
          <p className="text-small font-normal text-neutral-80 leading-[143%]">
            Selected: {getProvince(location)}
          </p>
        )}
      </div>
    );
  };

  // Inline DescriptionSection component using LabelWithTextarea
  const DescriptionSection = () => (
    <div className="space-y-2">
      <FormLabel
        text="Description"
        className="text-regular font-bold text-secondary leading-[150%]"
      />
      <LabelWithTextarea
        label="Description"
        content={description}
        placeholder="Add your description here..."
        setContent={handleDescriptionChange}
        minRows={4}
      />
    </div>
  );

  // Inline LanguagesSpokenSection component
  const LanguagesSpokenSection = () => {
    const languageItems = Object.entries(LANGUAGE_SPOKEN).map(([key, label]) => ({
      key,
      label,
      value: key,
    }));

    return (
      <div className="space-y-2">
        <FormLabel
          text="Languages Spoken"
          className="text-regular font-bold text-secondary leading-[150%]"
        />
        <Select
          variant="form-field"
          placeholder="Select languages"
          items={languageItems}
          selectedKeys={languagesSpoken}
          onSelectionChange={(keys) => {
            if (keys !== 'all') {
              setLanguagesSpoken(Array.from(keys) as LanguagesSpoken);
            }
          }}
          selectionMode="multiple"
          isRequired
        />
      </div>
    );
  };

  // Inline SkillOfferedSection component
  const SkillOfferedSection = () => {
    const skillItems = Object.entries(MENTOR_SKILL_OFFERED).map(([key, label]) => ({
      key,
      label,
      value: key,
    }));

    return (
      <div className="space-y-2">
        <FormLabel
          text="Skill Offered"
          className="text-regular font-bold text-secondary leading-[150%]"
        />
        <Select
          variant="form-field"
          placeholder="Select Skill Offered"
          items={skillItems}
          selectedKeys={skillOffered}
          onSelectionChange={(keys) => {
            if (keys !== 'all') {
              setSkillOffered(Array.from(keys) as SkillOffered);
            }
          }}
          selectionMode="multiple"
          isRequired
        />
      </div>
    );
  };

  // Inline SDGGoalSection component
  const SDGGoalSection = () => {
    const goalItems = Object.entries(STARTUP_SDG_GOALS).map(([key, goal]) => ({
      key: goal.textValue,
      label: goal.label,
      value: goal.textValue,
    }));

    return (
      <div className="space-y-2">
        <FormLabel
          text="SDG Goals"
          className="text-regular font-bold text-secondary leading-[150%]"
        />
        <Select
          variant="form-field"
          placeholder="Select SDG Goals"
          items={goalItems}
          selectedKeys={selectedGoals}
          onSelectionChange={(keys) => {
            if (keys !== 'all') {
              setSelectedGoals(Array.from(keys) as string[]);
            }
          }}
          selectionMode="multiple"
          isRequired
        />
        {selectedGoals.length > 0 && (
          <p className="text-small font-normal text-neutral-80 leading-[143%]">
            Selected: {selectedGoals.map((goal) => getSDGGoalLabel(goal)).join(', ')}
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
          className="border border-primary text-primary bg-neutral-20 hover:bg-neutral-40"
        >
          Cancel
        </Button>
      </div>
      <div className="flex-1">
        <Button
          variant="primary-full"
          onClick={handleCreateProfile}
          className="bg-primary text-neutral-20 hover:bg-primary-80"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-neutral-20 bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col w-[736px] p-8 bg-neutral-20 rounded-xl shadow-md space-y-8">
        <HeaderSection />
        <ProfilePictureUpload />
        <div className="space-y-6">
          <MentorNameSection />
          <PhoneSection />
          <LocationBasedSection />
          <DescriptionSection />
          <LanguagesSpokenSection />
          <SkillOfferedSection />
          <SDGGoalSection />
        </div>
        <ActionButtons />
      </div>
    </div>
  );
};

export default CreateNewMentor;
