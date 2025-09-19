/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Tabs, Tab, Divider, Avatar, addToast, useDisclosure } from '@heroui/react';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import React, { useState, useEffect } from 'react';
import { uploadAttachemt } from '@/apis/upload';
import { mentor_profile_update, mentor_profile_delete } from '@/apis/mentor-profile';
import { Mentor } from '@/interfaces/MentorProfile';
import LabelWithTextarea from '@/components/Input/LabelWithTextarea';
import sdgGoals from '@/utils/data/sdgGoals.json';
import provinces from '@/utils/data/provinces.json';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { LanguagesSpoken, SDGs } from '@/constants/common';
import { PROFILE_MESSAGES, UI_LABELS } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import { VALIDATION_ERROR_MESSAGES } from '@/errors';
import languages from '@/utils/data/languages.json';
import { SkillOffered } from '@/constants/skillOffered';
import skills from '@/utils/data/skillOffered.json';
import DeleteProfileModal from './DeleteProfileModal';
import HideProfileModal from './HideProfileModal';
import Button from '@/components/Button/Button';
import TimeAvailability from '@/components/TimeAvailable/TimeAvailability';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';

// Component for labels with red asterisk
const RequiredLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({
  children,
  required = false,
}) => (
  <label className='text-base font-bold text-secondary'>
    {children}
    {required && <span className='text-error ml-1'>*</span>}
  </label>
);

// Validation errors state
interface ValidationErrors {
  mentorName?: string;
  location?: string;
  sdgGoal?: string;
  description?: string;
  yearOfExperience?: string;
  industry?: string;
  skillOffered?: string;
  marketFocus?: string;
  fundingStageExperience?: string;
}

interface SettingModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  mentor: Mentor;
  onFetchMentorProfile: () => Promise<void>;
}

const MentorSettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onOpenChange,
  mentor,
  onFetchMentorProfile,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('general');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [image, setImage] = useState<string>(mentor.avtUrl || '');
  const [mentorName, setMentorName] = useState<string>(mentor.name || '');
  const [mentorUsername, setMentorUsername] = useState<string>(mentor.mentorUsername || '');
  const [location, setLocation] = useState<string>(mentor.locationBased || '');
  const [description, setDescription] = useState<string>(mentor.description || '');
  const [sdgFocusExpertises, setSdgFocusExpertises] = useState<string[]>(
    mentor.sdgFocusExpertises || []
  );
  const [skillOffered, setSkillOffered] = useState<string[]>(() => {
    if (!mentor.skillOffered || mentor.skillOffered.length === 0) return [];

    // Map skill labels to values, filtering out any invalid mappings
    return mentor.skillOffered
      .map((skill: string) => {
        const skillItem = skills.find((s) => s.label === skill);
        return skillItem?.value;
      })
      .filter((value): value is string => value !== undefined && value !== '');
  });
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>(mentor.languagesSpoken || []);
  const [marketFocusExpertise, setMarketFocusExpertise] = useState<string>(
    mentor.marketFocusExpertise || ''
  );
  const [experienceWithFundingStage, setExperienceWithFundingStage] = useState<string[]>(
    mentor.experienceWithFundingStage || []
  );
  const [yearOfProfessionalExperience, setYearOfProfessionalExperience] = useState<number>(
    mentor.yearOfProfessionalExperience || 0
  );
  const [currentWorkplace, setCurrentWorkplace] = useState<string>(mentor.currentWorkplace || '');
  const [currentPosition, setCurrentPosition] = useState<string>(mentor.currentPosition || '');
  const [industryFocus, setIndustryFocus] = useState<string[]>(mentor.industryFocus || []);
  const [profilePicture, setProfilePicture] = useState('');
  const [uploadedPictureId, setUploadedPictureId] = useState('');

  // Time availability states
  const [timeAvailability, setTimeAvailability] = useState<{
    [key: string]: { switchState: boolean; fromToValue: string[][] };
  }>({
    Monday: { switchState: false, fromToValue: [['', '']] },
    Tuesday: { switchState: false, fromToValue: [['', '']] },
    Wednesday: { switchState: false, fromToValue: [['', '']] },
    Thursday: { switchState: false, fromToValue: [['', '']] },
    Friday: { switchState: false, fromToValue: [['', '']] },
    Saturday: { switchState: false, fromToValue: [['', '']] },
    Sunday: { switchState: false, fromToValue: [['', '']] },
  });

  const {
    isOpen: isDeleteProfileModalOpen,
    onOpen: onOpenDeleteProfileModal,
    onOpenChange: onOpenChangeDeleteProfileModal,
  } = useDisclosure();
  const {
    isOpen: isHideProfileModalOpen,
    onOpen: onOpenHideProfileModal,
    onOpenChange: onOpenChangeHideProfileModal,
  } = useDisclosure();

  // Đồng bộ state với props khi mentor thay đổi
  useEffect(() => {
    if (mentor.name) {
      setMentorName(mentor.name);
    }
    if (mentor.locationBased) {
      setLocation(mentor.locationBased);
    }
    if (mentor.avtUrl) {
      setImage(mentor.avtUrl);
    }
    if (mentor.description) {
      setDescription(mentor.description);
    }
    if (mentor.sdgFocusExpertises) {
      setSdgFocusExpertises(mentor.sdgFocusExpertises);
    }
    if (mentor.skillOffered) {
      // Map skill labels to values, filtering out any invalid mappings
      const mappedSkills = mentor.skillOffered
        .map((skill: string) => {
          const skillItem = skills.find((s) => s.label === skill);
          return skillItem?.value;
        })
        .filter((value): value is string => value !== undefined && value !== '');
      setSkillOffered(mappedSkills);
    }
    if (mentor.languagesSpoken) {
      setLanguagesSpoken(mentor.languagesSpoken);
    }
    if (mentor.marketFocusExpertise) {
      setMarketFocusExpertise(mentor.marketFocusExpertise);
    }
    if (mentor.experienceWithFundingStage) {
      setExperienceWithFundingStage(mentor.experienceWithFundingStage);
    }
    if (mentor.yearOfProfessionalExperience) {
      setYearOfProfessionalExperience(mentor.yearOfProfessionalExperience);
    }
    if (mentor.currentWorkplace) {
      setCurrentWorkplace(mentor.currentWorkplace);
    }
    if (mentor.currentPosition) {
      setCurrentPosition(mentor.currentPosition);
    }
    if (mentor.industryFocus) {
      setIndustryFocus(mentor.industryFocus);
    }
    if (mentor.avtUrl) {
      setProfilePicture(mentor.avtUrl);
    }
  }, [mentor]);

  // Validation function
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Required field validations
    if (!mentorName.trim()) {
      errors.mentorName = VALIDATION_ERROR_MESSAGES.MENTOR_NAME_REQUIRED;
    }

    if (!location.trim()) {
      errors.location = VALIDATION_ERROR_MESSAGES.LOCATION_REQUIRED;
    }

    if (sdgFocusExpertises.length === 0) {
      errors.sdgGoal = VALIDATION_ERROR_MESSAGES.SDG_GOAL_REQUIRED;
    }

    if (!description.trim()) {
      errors.description = VALIDATION_ERROR_MESSAGES.DESCRIPTION_REQUIRED;
    }

    if (yearOfProfessionalExperience <= 0) {
      errors.yearOfExperience = VALIDATION_ERROR_MESSAGES.YEAR_EXPERIENCE_INVALID;
    }

    if (industryFocus.length === 0 || (industryFocus.length === 1 && !industryFocus[0].trim())) {
      errors.industry = VALIDATION_ERROR_MESSAGES.INDUSTRY_REQUIRED;
    }

    if (skillOffered.length === 0) {
      errors.skillOffered = VALIDATION_ERROR_MESSAGES.SKILL_OFFERED_REQUIRED;
    }

    if (!marketFocusExpertise.trim()) {
      errors.marketFocus = VALIDATION_ERROR_MESSAGES.MARKET_FOCUS_REQUIRED;
    }

    if (
      experienceWithFundingStage.length === 0 ||
      (experienceWithFundingStage.length === 1 && !experienceWithFundingStage[0].trim())
    ) {
      errors.fundingStageExperience = VALIDATION_ERROR_MESSAGES.FUNDING_STAGE_REQUIRED;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Clear validation error for specific field
  const clearValidationError = (fieldName: keyof ValidationErrors) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const onUpdateProfileClick = async () => {
    if (mentor.id) {
      // Validate form before submitting
      if (!validateForm()) {
        addToast({
          title: VALIDATION_ERROR_MESSAGES.FORM_VALIDATION_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        return;
      }

      setLoading(true);
      const requestBody = {
        name: mentorName,
        mentorUsername: mentorUsername,
        locationBased: location,
        description: description,
        sdgFocusExpertises: sdgFocusExpertises,
        skillOffered: skillOffered,
        languagesSpoken: languagesSpoken,
        marketFocusExpertise: marketFocusExpertise,
        experienceWithFundingStage: experienceWithFundingStage,
        yearOfProfessionalExperience: yearOfProfessionalExperience,
        currentWorkplace: currentWorkplace,
        currentPosition: currentPosition,
        industryFocus: industryFocus,
        avtUrl: profilePicture ? profilePicture : mentor.avtUrl,
      };
      try {
        await mentor_profile_update(mentor.id, requestBody);
        addToast({
          title: PROFILE_MESSAGES.PROFILE_UPDATED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        await onFetchMentorProfile();
      } catch (err) {
        setError(PROFILE_MESSAGES.PROFILE_UPDATE_FAILED);
        addToast({
          title: PROFILE_MESSAGES.PROFILE_UPDATE_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        setLoading(false);
        onOpenChange();
      }
    }
  };

  const handleHideProfileClick = async () => {
    if (mentor.id) {
      setLoading(true);
      const requestBody = {
        isHide: !mentor.isHide,
      };

      try {
        await mentor_profile_update(mentor.id, requestBody);
        if (requestBody.isHide) {
          addToast({
            title: PROFILE_MESSAGES.PROFILE_HIDDEN_SUCCESS,
            color: TOAST_COLORS.SUCCESS,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
        } else {
          addToast({
            title: PROFILE_MESSAGES.PROFILE_UNHIDDEN_SUCCESS,
            color: TOAST_COLORS.SUCCESS,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
        }
      } catch (err) {
        if (requestBody.isHide) {
          addToast({
            title: PROFILE_MESSAGES.PROFILE_HIDE_FAILED,
            color: TOAST_COLORS.DANGER,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
        } else {
          addToast({
            title: PROFILE_MESSAGES.PROFILE_UNHIDE_FAILED,
            color: TOAST_COLORS.DANGER,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
        }
      } finally {
        setLoading(false);
        onOpenChange();
      }
    }
  };

  const handleDeleteProfileClick = async () => {
    if (mentor.id) {
      setLoading(true);
      try {
        await mentor_profile_delete(mentor.id);
        addToast({
          title: PROFILE_MESSAGES.PROFILE_DELETED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } catch (err) {
        addToast({
          title: PROFILE_MESSAGES.PROFILE_DELETE_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        setLoading(false);
        onOpenChange();
      }
    }
  };

  const onImageUpload = (fileUrl: string, fileId: string) => {
    setProfilePicture(fileUrl);
    setUploadedPictureId(fileId);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const response = await uploadAttachemt({ file, ownerType: UPLOAD_OWNER_TYPE.MENTOR });
        setImage(response.data.attachmentUrl);
        setError(null);
        onImageUpload(response.data.attachmentUrl, response.data.id);
        addToast({
          title: PROFILE_MESSAGES.IMAGE_UPLOADED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } catch (err) {
        setError(PROFILE_MESSAGES.IMAGE_UPLOAD_FAILED);
        addToast({
          title: PROFILE_MESSAGES.IMAGE_UPLOAD_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        setLoading(false);
        event.target.files = null;
      }
    } else {
      setError(PROFILE_MESSAGES.NO_FILE_SELECTED);
      addToast({
        title: PROFILE_MESSAGES.NO_FILE_SELECTED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    }
  };

  return (
    <Modal
      size='5xl'
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior='inside'
      className='p-0 rounded-3xl shadow-2xl'
    >
      <ModalContent>
        {(onOpenChange) => (
          <>
            {/* Header Section */}
            <div className='flex items-center justify-between p-regular bg-white rounded-t-3xl'>
              <div className='flex items-center gap-3'>
                <Avatar
                  alt='mentor avatar'
                  src={image}
                  size='md'
                  radius='full'
                  className='w-10 h-10'
                />
                <div className='flex flex-col'>
                  <p className='font-bold text-xl text-secondary'>{mentor?.name}</p>
                  <p className='text-neutral-80 font-normal text-base'>Setting</p>
                </div>
              </div>
              <button
                onClick={onOpenChange}
                className='w-6 h-6 flex items-center justify-center hover:bg-neutral-30 rounded-full transition-colors'
              >
                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <Divider className='border-neutral-40' />

            <ModalBody className='p-0'>
              <div className='flex h-full'>
                {/* Left Sidebar - Tabs */}
                <div className='w-64 flex flex-col gap-2 p-regular border-r border-neutral-40'>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTab === 'general'
                        ? 'bg-primary-20 text-primary'
                        : 'text-secondary hover:bg-neutral-30'
                    }`}
                    onClick={() => setSelectedTab('general')}
                  >
                    <span className='font-bold text-base'>General</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTab === 'time'
                        ? 'bg-primary-20 text-primary'
                        : 'text-secondary hover:bg-neutral-30'
                    }`}
                    onClick={() => setSelectedTab('time')}
                  >
                    <span className='font-bold text-base'>Time Availability</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTab === 'advanced'
                        ? 'bg-primary-20 text-primary'
                        : 'text-secondary hover:bg-neutral-30'
                    }`}
                    onClick={() => setSelectedTab('advanced')}
                  >
                    <span className='font-bold text-base'>Advanced</span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className='w-px bg-neutral-40' />

                {/* Right Content Area */}
                <div className='flex-1 p-regular'>
                  {selectedTab === 'general' && (
                    <div className='flex flex-col gap-6'>
                      {/* Basic Information Header */}
                      <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold text-primary'>Basic information</h2>
                        <Divider className='border-neutral-40' />
                      </div>

                      {/* Profile Photo Section */}
                      <div className='flex items-center gap-4'>
                        <Avatar
                          alt='mentor avatar'
                          src={image}
                          className='w-10 h-10'
                          radius='full'
                        />
                        <label htmlFor='profile-upload' className='cursor-pointer'>
                          <p className='font-bold text-base text-blue-600 hover:text-blue-700 transition-colors'>
                            Change profile photo
                          </p>
                        </label>
                        <input
                          id='profile-upload'
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={handleImageChange}
                        />
                      </div>

                      {/* Form Fields */}
                      <div className='flex flex-col gap-regular'>
                        {/* Mentor Name */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>Mentor name</RequiredLabel>
                          <Input
                            variant='text'
                            preset='default-md'
                            value={mentorName}
                            onChange={(value) => {
                              setMentorName(value);
                              clearValidationError('mentorName');
                            }}
                            placeholder='Mentor name'
                            className={`w-full ${validationErrors.mentorName ? 'border-error' : ''}`}
                          />
                          {validationErrors.mentorName && (
                            <span className='text-error text-sm'>
                              {validationErrors.mentorName}
                            </span>
                          )}
                        </div>

                        {/* Location */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>Location</RequiredLabel>
                          <div className='relative'>
                            <Autocomplete
                              isVirtualized={false}
                              labelPlacement='outside'
                              placeholder='Select location'
                              onSelectionChange={(value) => {
                                setLocation(String(value));
                                clearValidationError('location');
                              }}
                              defaultItems={provinces}
                              variant='bordered'
                              defaultSelectedKey={location}
                              className={`w-full ${validationErrors.location ? 'border-error' : ''}`}
                            >
                              {(item) => (
                                <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
                              )}
                            </Autocomplete>
                          </div>
                          {validationErrors.location && (
                            <span className='text-error text-sm'>{validationErrors.location}</span>
                          )}
                        </div>

                        {/* SDG Goal */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>SDG Goal</RequiredLabel>
                          <Select
                            variant='form-field'
                            items={sdgGoals.map((goal) => ({
                              key: goal.value,
                              label: goal.label,
                              value: goal.value,
                            }))}
                            selectedKeys={new Set(sdgFocusExpertises)}
                            onSelectionChange={(keys) => {
                              if (keys === 'all') {
                                setSdgFocusExpertises(sdgGoals.map((goal) => goal.value));
                              } else {
                                setSdgFocusExpertises(Array.from(keys).map(String));
                              }
                              clearValidationError('sdgGoal');
                            }}
                            selectionMode='multiple'
                            placeholder='Select SDG goals'
                            className={`w-full [&_button]:min-h-12 [&_button]:h-auto [&_div[data-slot='innerWrapper']]:flex-wrap ${validationErrors.sdgGoal ? 'border-error' : ''}`}
                            renderValue={(items) => (
                              <div className='flex flex-wrap gap-1 py-1'>
                                {items.map((item) => (
                                  <span
                                    key={item.key}
                                    className='inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-20 text-primary rounded-md'
                                  >
                                    {item.textValue}
                                  </span>
                                ))}
                              </div>
                            )}
                          />
                          {validationErrors.sdgGoal && (
                            <span className='text-error text-sm'>{validationErrors.sdgGoal}</span>
                          )}
                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>Description</RequiredLabel>
                          <textarea
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                              clearValidationError('description');
                            }}
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:border-primary transition-colors ${
                              validationErrors.description ? 'border-error' : 'border-neutral-50'
                            }`}
                            placeholder='Enter description'
                          />
                          {validationErrors.description && (
                            <span className='text-error text-sm'>
                              {validationErrors.description}
                            </span>
                          )}
                        </div>

                        {/* Year of Experience */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>Year of Experience</RequiredLabel>
                          <input
                            type='number'
                            value={yearOfProfessionalExperience}
                            onChange={(e) => {
                              setYearOfProfessionalExperience(parseInt(e.target.value) || 0);
                              clearValidationError('yearOfExperience');
                            }}
                            placeholder='Enter years of experience'
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors ${
                              validationErrors.yearOfExperience
                                ? 'border-error'
                                : 'border-neutral-50'
                            }`}
                          />
                          {validationErrors.yearOfExperience && (
                            <span className='text-error text-sm'>
                              {validationErrors.yearOfExperience}
                            </span>
                          )}
                        </div>

                        {/* Current Workspace */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel>Current Workspace</RequiredLabel>
                          <Input
                            variant='text'
                            preset='default-md'
                            value={currentWorkplace}
                            onChange={setCurrentWorkplace}
                            placeholder='Enter current workspace'
                            className='w-full'
                          />
                        </div>

                        {/* Current Position */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel>Current Position</RequiredLabel>
                          <Input
                            variant='text'
                            preset='default-md'
                            value={currentPosition}
                            onChange={setCurrentPosition}
                            placeholder='Enter current position'
                            className='w-full'
                          />
                        </div>

                        {/* Industry */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>Industry</RequiredLabel>
                          <Input
                            variant='text'
                            preset='default-md'
                            value={industryFocus.join(', ')}
                            onChange={(value) => {
                              setIndustryFocus(
                                value
                                  .split(',')
                                  .map((item) => item.trim())
                                  .filter(Boolean)
                              );
                              clearValidationError('industry');
                            }}
                            placeholder='Enter industry (comma separated)'
                            className={`w-full ${validationErrors.industry ? 'border-error' : ''}`}
                          />
                          {validationErrors.industry && (
                            <span className='text-error text-sm'>{validationErrors.industry}</span>
                          )}
                        </div>

                        {/* Skill Offered */}
                        <div className='flex flex-col gap-2'>
                          <RequiredLabel required>Skill offered</RequiredLabel>
                          <Select
                            variant='form-field'
                            items={skills.map((skill) => ({
                              key: skill.value,
                              label: skill.label,
                              value: skill.value,
                            }))}
                            selectedKeys={new Set(skillOffered)}
                            onSelectionChange={(keys) => {
                              if (keys === 'all') {
                                setSkillOffered(skills.map((skill) => skill.value));
                              } else {
                                setSkillOffered(Array.from(keys).map(String));
                              }
                              clearValidationError('skillOffered');
                            }}
                            selectionMode='multiple'
                            placeholder='Select skills offered'
                            className={`w-full [&_button]:min-h-12 [&_button]:h-auto [&_div[data-slot='innerWrapper']]:flex-wrap ${validationErrors.skillOffered ? 'border-error' : ''}`}
                            renderValue={(items) => (
                              <div className='flex flex-wrap gap-1 py-1'>
                                {items.map((item) => (
                                  <span
                                    key={item.key}
                                    className='inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-20 text-primary rounded-md'
                                  >
                                    {item.textValue}
                                  </span>
                                ))}
                              </div>
                            )}
                          />
                          {validationErrors.skillOffered && (
                            <span className='text-error text-sm'>
                              {validationErrors.skillOffered}
                            </span>
                          )}
                        </div>

                        {/* Advanced Information Section */}
                        <div className='bg-white border border-neutral-40 rounded-3xl p-6 mt-6'>
                          <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                              <h3 className='text-2xl font-bold text-primary'>
                                Advanced Information
                              </h3>
                              <Divider className='border-neutral-40' />
                            </div>

                            <div className='flex flex-col gap-regular'>
                              {/* Market Focus */}
                              <div className='flex flex-col gap-2'>
                                <RequiredLabel required>Market Focus</RequiredLabel>
                                <Input
                                  variant='text'
                                  preset='default-md'
                                  value={marketFocusExpertise}
                                  onChange={(value) => {
                                    setMarketFocusExpertise(value);
                                    clearValidationError('marketFocus');
                                  }}
                                  placeholder='Enter market focus'
                                  className={`w-full ${validationErrors.marketFocus ? 'border-error' : ''}`}
                                />
                                {validationErrors.marketFocus && (
                                  <span className='text-error text-sm'>
                                    {validationErrors.marketFocus}
                                  </span>
                                )}
                              </div>

                              {/* Funding Stage Experience */}
                              <div className='flex flex-col gap-2'>
                                <RequiredLabel required>Funding Stage Experience</RequiredLabel>
                                <Input
                                  variant='text'
                                  preset='default-md'
                                  value={experienceWithFundingStage.join(', ')}
                                  onChange={(value) => {
                                    setExperienceWithFundingStage(
                                      value
                                        .split(',')
                                        .map((item) => item.trim())
                                        .filter(Boolean)
                                    );
                                    clearValidationError('fundingStageExperience');
                                  }}
                                  placeholder='Enter funding stage experience (comma separated)'
                                  className={`w-full ${validationErrors.fundingStageExperience ? 'border-error' : ''}`}
                                />
                                {validationErrors.fundingStageExperience && (
                                  <span className='text-error text-sm'>
                                    {validationErrors.fundingStageExperience}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'time' && (
                    <div className='flex flex-col gap-6'>
                      <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-bold text-primary'>Time Availability</h2>
                        <p className='text-sm text-neutral-80'>
                          Set your available time for mentoring sessions
                        </p>
                        <Divider className='border-neutral-40' />
                      </div>

                      <div className='flex flex-col gap-4'>
                        {Object.keys(timeAvailability).map((day) => (
                          <TimeAvailability
                            key={day}
                            dayOfWeek={day}
                            switchState={timeAvailability[day].switchState}
                            setSwitchState={(state) =>
                              setTimeAvailability((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], switchState: state },
                              }))
                            }
                            fromToValue={timeAvailability[day].fromToValue}
                            setFromToValue={(value) =>
                              setTimeAvailability((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], fromToValue: value },
                              }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTab === 'advanced' && (
                    <div className='flex flex-col gap-6'>
                      <div className='flex justify-between items-center'>
                        <div className='flex flex-col'>
                          <p className='font-semibold text-base text-secondary'>Archive Profile</p>
                          <p className='text-sm text-neutral-80'>
                            Hide your profile from search results across entire platform.
                          </p>
                        </div>
                        <Button
                          variant='warning-md'
                          onClick={onOpenHideProfileModal}
                          className='w-32'
                        >
                          Hide
                        </Button>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex flex-col'>
                          <p className='font-semibold text-base text-secondary'>Delete Profile</p>
                          <p className='text-sm text-neutral-80'>
                            Permanently delete your mentor profile
                          </p>
                        </div>
                        <Button
                          variant='warning-md'
                          onClick={onOpenDeleteProfileModal}
                          className='w-32'
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>

            {/* Footer */}
            <div className='flex justify-end gap-4 p-regular border-t border-neutral-40'>
              <Button variant='secondary-md' onClick={onOpenChange} disabled={loading}>
                Cancel
              </Button>
              <Button variant='primary-md' onClick={onUpdateProfileClick} disabled={loading}>
                Update profile
              </Button>
            </div>

            {/* Modals */}
            <HideProfileModal
              isOpen={isHideProfileModalOpen}
              onOpenChange={onOpenChangeHideProfileModal}
              onHideProfile={handleHideProfileClick}
              isHide={mentor.isHide}
            />
            <DeleteProfileModal
              isOpen={isDeleteProfileModalOpen}
              onOpenChange={onOpenChangeDeleteProfileModal}
              onDeleteProfile={handleDeleteProfileClick}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default MentorSettingModal;
