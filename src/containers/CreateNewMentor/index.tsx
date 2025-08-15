'use client';
import React, { useState } from 'react';
import { create_mentor_profile } from '@/apis/mentor';
import { LanguagesSpoken } from '@/constants/common';
import { SkillOffered } from '@/constants/skillOffered';
import { addToast } from '@heroui/react';
import * as changeCase from 'change-case';
import { PROVINCES } from '@/constants/provinces';
import { updateAttachment } from '@/apis/upload';
import { useRouter } from 'next/navigation';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import LabelWithTextarea from '@/components/Input/LabelWithTextarea';
import { TOAST_COLORS, TOAST_MESSAGES, TOAST_TIMEOUT } from '@/constants/api';
import Image from 'next/image';

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
  };

  const handleChangeImage = (fileUrl: string, fileId: string) => {
    setProfilePicture(fileUrl);
    setUploadedPictureId(fileId);
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
    };

    try {
      const response = await create_mentor_profile(requestBody);
      addToast({
        title: 'Profile created successfully',
        color: TOAST_COLORS.SUCCESS,
        timeout: TOAST_TIMEOUT.SHORT,
      });
      router.push(`/mentor-detail/${response.data.newMentor.id}`);

      updateAttachment({
        id: uploadedPictureId,
        ownerId: response.data.newMentor.id,
        ownerType: UPLOAD_OWNER_TYPE.MENTOR,
      });
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

  // Inline HeaderSection component
  const HeaderSection = () => (
    <div className="flex flex-col items-center gap-2 w-full">
      <h1 className="text-[28px] font-bold text-secondary leading-[109%] text-center">
        Mentor profile
      </h1>
      <p className="text-sm text-empacts-grey-100 leading-[120%] text-center">
        Access to your mentor profile
      </p>
    </div>
  );

  // Inline ProfilePictureUpload component
  const ProfilePictureUpload = ({ onImageUpload }: { onImageUpload: (fileUrl: string, fileId: string) => void }) => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // TODO: Implement file upload logic
        const mockFileUrl = URL.createObjectURL(file);
        const mockFileId = 'temp-id';
        onImageUpload(mockFileUrl, mockFileId);
      }
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <Image src={profilePicture} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 text-sm">No image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="profile-picture"
        />
        <label htmlFor="profile-picture" className="cursor-pointer">
          <Button variant="secondary-md">Upload Picture</Button>
        </label>
      </div>
    );
  };

  // Inline MentorNameSection component using Input component
  const MentorNameSection = () => (
    <div className="space-y-4">
      <Input
        variant="text"
        preset="default-md"
        label="Mentor Name *"
        value={mentorName}
        onChange={(value) => {
          setMentorName(value);
          handleChangeMentorUsername(value);
        }}
        placeholder="Enter mentor name"
        isRequired
      />
      <Input
        variant="text"
        preset="default-md"
        label="Username"
        value={mentorUsername}
        onChange={() => {}} // Read-only
        isDisabled
      />
    </div>
  );

  // Inline LocationBasedSection component using Select component
  const LocationBasedSection = () => {
    const locationItems = PROVINCES.map(province => ({
      key: province.key,
      label: province.label,
      value: province.key,
    }));

    return (
      <Select
        variant="form-field"
        label="Location *"
        placeholder="Select location"
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
    );
  };

  // Inline DescriptionSection component using LabelWithTextarea
  const DescriptionSection = () => (
    <LabelWithTextarea
      label="Description *"
      content={description}
      placeholder="Describe your expertise and experience"
      setContent={handleDescriptionChange}
      minRows={4}
    />
  );

  // Inline LanguagesSpokenSection component
  const LanguagesSpokenSection = () => {
    const languages = ['EN', 'VI', 'FR', 'DE', 'ES', 'CN', 'JP', 'KR'];
    
    const toggleLanguage = (lang: string) => {
      if (languagesSpoken.includes(lang as LanguagesSpoken[0])) {
        setLanguagesSpoken(languagesSpoken.filter(l => l !== lang));
      } else {
        setLanguagesSpoken([...languagesSpoken, lang as LanguagesSpoken[0]]);
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken *</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-2 rounded-lg border ${
                languagesSpoken.includes(lang as LanguagesSpoken[0])
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Inline SkillOfferedSection component
  const SkillOfferedSection = () => {
    const skills = ['Business Strategy', 'Marketing', 'Finance', 'Technology', 'Operations', 'Sales'];
    
    const toggleSkill = (skill: string) => {
      if (skillOffered.includes(skill as SkillOffered[0])) {
        setSkillOffered(skillOffered.filter(s => s !== skill));
      } else {
        setSkillOffered([...skillOffered, skill as SkillOffered[0]]);
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skills Offered *</label>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-2 rounded-lg border ${
                skillOffered.includes(skill as SkillOffered[0])
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Inline SDGGoalSection component
  const SDGGoalSection = () => {
    const goals = [
      'No Poverty', 'Zero Hunger', 'Good Health', 'Quality Education',
      'Gender Equality', 'Clean Water', 'Affordable Energy', 'Decent Work'
    ];
    
    const toggleGoal = (goal: string) => {
      if (selectedGoals.includes(goal)) {
        setSelectedGoals(selectedGoals.filter(g => g !== goal));
      } else {
        setSelectedGoals([...selectedGoals, goal]);
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">SDG Goals Focus *</label>
        <div className="flex flex-wrap gap-2">
          {goals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={`px-3 py-2 rounded-lg border ${
                selectedGoals.includes(goal)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Inline ActionButtons component
  const ActionButtons = () => (
    <div className="flex flex-row justify-between w-full gap-8 h-12">
      <div className="flex-1">
        <Button variant="secondary-full" onClick={handleCancelCreateProfile}>
          Cancel
        </Button>
      </div>
      <div className="flex-1">
        <Button variant="primary-full" onClick={handleCreateProfile}>
          Create New
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
      <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
        <HeaderSection />
        <ProfilePictureUpload onImageUpload={handleChangeImage} />
        <MentorNameSection />
        <LocationBasedSection />
        <DescriptionSection />
        <LanguagesSpokenSection />
        <SkillOfferedSection />
        <SDGGoalSection />
        <ActionButtons />
      </div>
    </div>
  );
}

export default CreateNewMentor;
