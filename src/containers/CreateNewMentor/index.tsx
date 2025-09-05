'use client';
import React, { useState, useMemo, useCallback } from 'react';
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
import Stepper from '@/components/Stepper/Stepper';
import TimeArability from '@/components/TimeAvailable/TimeArability';

// Location Select Render Value
const renderPurpleValue = (items: any[]) => {
  return items.map((item) => (
    <span key={item.key} className="text-primary font-medium">
      {item.data?.label || item.textValue}
    </span>
  ));
};

// Generic Multi-Select Render Value with Chips
const createChipsRenderValue = <T extends string[]>(
  selectedItems: T,
  setSelectedItems: (items: T) => void
) => {
  return (items: any[]) => {
    if (items.length === 0) return null;

    const handleRemoveItem = (itemToRemove: string) => {
      const updatedItems = selectedItems.filter((item) => item !== itemToRemove) as T;
      setSelectedItems(updatedItems);
    };

    return (
      <div className="flex flex-wrap gap-1 py-1">
        {items.map((item) => (
          <span
            key={item.key}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 h-8 bg-primary-20 border border-primary-40 rounded-lg text-sm text-primary font-medium"
          >
            <span>{item.data?.label || item.textValue}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(item.key as string);
              }}
              className="w-4 h-4 flex items-center justify-center rounded hover:bg-primary-40 transition-colors"
              aria-label={`Remove ${item.data?.label || item.textValue}`}
            >
              <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    );
  };
};

const CreateNewMentor = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
  const [switchState, setSwitchState] = useState(true);
  const [fromToValue, setFromToValue] = useState<string[][]>([['', '']]);
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentWorkplace, setCurrentWorkplace] = useState('');
  const [industry, setIndustry] = useState('');
  const [marketFocus, setMarketFocus] = useState('');

  const router = useRouter();

  const steps = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Career' },
    { id: 3, label: 'Mentorship' },
    { id: 4, label: 'Availability' },
  ];

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleCancelCreateProfile = useCallback(() => {
    router.back();
  }, [router]);

  const handleChangeImage = async (file: File) => {
    try {
      setLoading(true);
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

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleChangeImage(file);
    }
  }, []);

  const handleChangeMentorUsername = useCallback((mentorName: string) => {
    const username = changeCase.snakeCase(mentorName);
    setMentorUsername('@' + username);
  }, []);

  const handleDescriptionChange = useCallback((newDescription: string) => {
    setDescription(newDescription);
  }, []);

  const handleLanguagesSpokenChange = useCallback((newLanguages: LanguagesSpoken) => {
    setLanguagesSpoken(newLanguages);
  }, []);

  const handleSkillOfferedChange = useCallback((newSkills: SkillOffered) => {
    setSkillOffered(newSkills);
  }, []);

  const handleCreateProfile = async () => {
    const avtUrl = profilePicture || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
    if (
      !mentorName.trim() ||
      !mentorUsername.trim() ||
      !location ||
      !avtUrl ||
      !selectedGoals.length ||
      !languagesSpoken.length ||
      !skillOffered.length
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
      description: 'Mentor profile', // Default description since field is not in UI
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
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    </div>
  );

  // Header Section
  const HeaderSection = () => (
    <div className="flex flex-col items-center gap-2 w-full">
      <h1 className="text-2xl font-bold text-secondary leading-[175%] text-center">
        Mentor profile
      </h1>
      <TextLine
        text="Bring your knowledge to the world"
        className="text-neutral-500 text-sm font-normal"
      />
    </div>
  );

  // Step 1: Profile
  const ProfileStep = useMemo(
    () => (
      <div className="space-y-6 w-full">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center gap-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-picture"
          />
          <label htmlFor="profile-picture" className="cursor-pointer">
            <div className="w-20 h-20 min-w-20 min-h-20 rounded-full bg-neutral-40 flex items-center justify-center overflow-hidden hover:bg-neutral-50 transition-colors">
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
          <p className="text-lg font-normal text-secondary leading-[150%] text-center">
            Upload your profile picture
          </p>
        </div>

        {/* Mentor Name */}
        <div className="space-y-2">
          <FormLabel
            text="Mentor name"
            className="text-base font-bold text-secondary leading-[150%]"
          />
          <Input
            variant="text"
            preset="default-lg"
            value={mentorName}
            onChange={(value) => {
              setMentorName(value);
              // handleChangeMentorUsername(value);
            }}
            placeholder="Enter your preferred name as a mentor"
            isRequired
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <FormLabel
            text="Location based"
            className="text-base font-bold text-secondary leading-[150%]"
          />
          <Select
            isVirtualized={false}
            variant="form-field"
            placeholder="Search location"
            items={provinces.map((province) => ({
              key: province.value,
              label: province.label,
              value: province.value,
            }))}
            selectedKeys={location ? [location] : []}
            onSelectionChange={(keys) => {
              if (keys !== 'all' && keys.size > 0) {
                const selectedKey = Array.from(keys)[0];
                setLocation(selectedKey.toString());
              }
            }}
            className="[&_button]:h-12 [&_button]:min-h-12"
            renderValue={renderPurpleValue}
            isRequired
          />
        </div>

        {/* SDG Goal */}
        <div className="space-y-2">
          <FormLabel
            text="SDG Goal"
            className="text-base font-bold text-secondary leading-[150%]"
          />
          <Select
            variant="form-field"
            placeholder="Search goal"
            items={Object.entries(STARTUP_SDG_GOALS).map(([key, goal]) => ({
              key: goal.textValue,
              label: goal.label,
              value: goal.textValue,
            }))}
            selectedKeys={selectedGoals}
            onSelectionChange={(keys) => {
              if (keys !== 'all') {
                setSelectedGoals(Array.from(keys) as string[]);
              }
            }}
            itemHeight={32}
            selectionMode="multiple"
            className="[&_button]:min-h-12 [&_button]:h-auto [&_div[data-slot='innerWrapper']]:flex-wrap"
            renderValue={createChipsRenderValue(selectedGoals, setSelectedGoals)}
            isRequired
          />
        </div>
      </div>
    ),
    [profilePicture, mentorName, location, selectedGoals, handleFileChange]
  );

  // Step 2: Career
  const CareerStep = useMemo(
    () => (
      <div className="space-y-6 w-full">
        {/* Year of Experience */}
        <div className="space-y-2">
          <FormLabel
            text="Year of Experience"
            className="text-sm font-semibold text-secondary leading-[150%]"
          />
          <Input
            variant="text"
            preset="default-lg"
            value={yearOfExperience}
            onChange={setYearOfExperience}
            placeholder="Enter year"
          />
        </div>

        {/* Current Position */}
        <div className="space-y-2">
          <FormLabel
            text="Current Position"
            className="text-sm font-semibold text-secondary leading-[150%]"
          />
          <Input
            variant="text"
            preset="default-lg"
            value={currentPosition}
            onChange={setCurrentPosition}
            placeholder="Enter your current position"
          />
        </div>

        {/* Current Workplace */}
        <div className="space-y-2">
          <FormLabel
            text="Current Workplace"
            className="text-sm font-semibold text-secondary leading-[150%]"
          />
          <Input
            variant="text"
            preset="default-lg"
            value={currentWorkplace}
            onChange={setCurrentWorkplace}
            placeholder="Enter your current workplace"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <FormLabel
            text="Industry"
            className="text-sm font-semibold text-secondary leading-[150%]"
          />
          <Select
            variant="form-field"
            placeholder="Search Industry"
            items={[
              { key: 'tech', label: 'Technology', value: 'tech' },
              { key: 'finance', label: 'Finance', value: 'finance' },
              { key: 'healthcare', label: 'Healthcare', value: 'healthcare' },
              { key: 'education', label: 'Education', value: 'education' },
              { key: 'retail', label: 'Retail', value: 'retail' },
              { key: 'manufacturing', label: 'Manufacturing', value: 'manufacturing' },
              { key: 'other', label: 'Other', value: 'other' },
            ]}
            selectedKeys={industry ? [industry] : []}
            onSelectionChange={(keys) => {
              if (keys !== 'all' && keys.size > 0) {
                const selectedKey = Array.from(keys)[0];
                setIndustry(selectedKey.toString());
              }
            }}
            className="[&_button]:h-12 [&_button]:min-h-12"
            renderValue={renderPurpleValue}
          />
        </div>
      </div>
    ),
    [yearOfExperience, currentPosition, currentWorkplace, industry]
  );

  // Step 3: Mentorship
  const MentorshipStep = useMemo(
    () => (
      <div className="space-y-6 w-full">
        {/* Market Focus */}
        <div className="space-y-2">
          <FormLabel
            text="Market Focus*"
            className="text-sm font-semibold text-secondary leading-[150%]"
          />
          <Select
            variant="form-field"
            placeholder="Search country"
            items={[
              { key: 'global', label: 'Global', value: 'global' },
              { key: 'asia', label: 'Asia', value: 'asia' },
              { key: 'europe', label: 'Europe', value: 'europe' },
              { key: 'north-america', label: 'North America', value: 'north-america' },
              { key: 'south-america', label: 'South America', value: 'south-america' },
              { key: 'africa', label: 'Africa', value: 'africa' },
              { key: 'australia', label: 'Australia', value: 'australia' },
            ]}
            selectedKeys={marketFocus ? [marketFocus] : []}
            onSelectionChange={(keys) => {
              if (keys !== 'all' && keys.size > 0) {
                const selectedKey = Array.from(keys)[0];
                setMarketFocus(selectedKey.toString());
              }
            }}
            className="[&_button]:h-12 [&_button]:min-h-12"
            renderValue={renderPurpleValue}
          />
        </div>

        {/* Skill Offered (Review) */}
        <div className="space-y-2">
          <FormLabel
            text="Skill offered*"
            className="text-sm font-semibold text-secondary leading-[150%]"
          />
          <Select
            variant="form-field"
            placeholder="Search skill"
            items={Object.entries(MENTOR_SKILL_OFFERED).map(([key, label]) => ({
              key,
              label,
              value: key,
            }))}
            selectedKeys={skillOffered}
            onSelectionChange={(keys) => {
              if (keys !== 'all') {
                setSkillOffered(Array.from(keys) as SkillOffered);
              }
            }}
            selectionMode="multiple"
            className="[&_button]:min-h-12 [&_button]:h-auto [&_div[data-slot='innerWrapper']]:flex-wrap"
            renderValue={createChipsRenderValue(skillOffered, setSkillOffered)}
            isRequired
          />
        </div>
      </div>
    ),
    [marketFocus, skillOffered]
  );

  // Step 4: Availability
  const AvailabilityStep = () => (
    <TimeArability
      dayOfWeek="Monday"
      switchState={switchState}
      setSwitchState={setSwitchState}
      fromToValue={fromToValue}
      setFromToValue={setFromToValue}
    />
  );

  // Action Buttons
  const ActionButtons = () => (
    <div className="flex flex-row justify-between w-full gap-8 h-12">
      <div className="flex-1">
        <Button
          variant="secondary-full"
          onClick={currentStep === 0 ? handleCancelCreateProfile : handleBack}
        >
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
      </div>
      <div className="flex-1">
        <Button
          variant="primary-full"
          onClick={currentStep === steps.length - 1 ? handleCreateProfile : handleNext}
          className="bg-primary text-neutral-20 hover:bg-primary-80"
        >
          {currentStep === steps.length - 1 ? 'Continue' : 'Continue'}
        </Button>
      </div>
    </div>
  );

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return ProfileStep;
      case 1:
        return CareerStep;
      case 2:
        return MentorshipStep;
      case 3:
        return <AvailabilityStep />;
      default:
        return ProfileStep;
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-neutral-20 bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col w-full max-w-[940px] p-8 bg-neutral-20 rounded-xl shadow-md space-y-8">
        <HeaderSection />

        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

        {/* Step Content */}
        <div className="w-full">{renderStepContent()}</div>

        <ActionButtons />
      </div>
    </div>
  );
};

export default CreateNewMentor;
