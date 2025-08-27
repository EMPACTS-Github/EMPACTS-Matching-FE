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
import languages from '@/utils/data/languages.json';
import { SkillOffered } from '@/constants/skillOffered';
import skills from '@/utils/data/skillOffered.json';
import { Select, SelectItem } from '@heroui/react';
import DeleteProfileModal from './DeleteProfileModal';
import HideProfileModal from './HideProfileModal';
import Button from '@/components/Button/Button';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';

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

  const onUpdateProfileClick = async () => {
    if (mentor.id) {
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
      size="5xl"
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      className="py-4 px-6 min-h-96"
    >
      <ModalContent>
        {(onOpenChange) => (
          <>
            <ModalHeader>
              <div className="flex gap-3">
                <Avatar
                  alt="heroui logo"
                  src={image}
                  size="md"
                  radius="full"
                  isBordered
                  color="primary"
                  className="bg-neutral-20"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-lg text-secondary">{mentor?.name}</p>
                  <p className="text-neutral-50 font-normal text-md">{UI_LABELS.MENTOR_SETTING}</p>
                </div>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <Tabs
                aria-label="Options"
                variant="light"
                color="primary"
                isVertical={true}
                className="py-2 pr-4 mr-4 border-r-1 border-neutral-40"
              >
                <Tab
                  key="general"
                  title={UI_LABELS.GENERAL}
                  className="w-full flex flex-col gap-2 py-2"
                >
                  <div className="font-semibold text-lg text-primary">
                    {UI_LABELS.BASIC_INFORMATION}
                  </div>
                  <Divider />
                  <div className="flex gap-4">
                    <Avatar
                      alt="heroui logo"
                      src={image}
                      size="sm"
                      radius="full"
                      isBordered
                      color="primary"
                      className="bg-neutral-20"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <label htmlFor="profile-upload" className="cursor-pointer">
                        <p className="font-semibold text-sm text-primary">
                          {UI_LABELS.CHANGE_PROFILE_PHOTO}
                        </p>
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <LabelWithTextarea
                    label={UI_LABELS.MENTOR_NAME}
                    content={mentorName}
                    setContent={setMentorName}
                    minRows={1}
                    placeholder={UI_LABELS.MENTOR_NAME}
                  />
                  <LabelWithTextarea
                    label={UI_LABELS.MENTOR_USERNAME}
                    content={mentorUsername}
                    setContent={setMentorUsername}
                    minRows={1}
                    placeholder={UI_LABELS.MENTOR_USERNAME}
                  />
                  <Autocomplete
                    isVirtualized={false}
                    labelPlacement="outside"
                    label={UI_LABELS.LOCATION}
                    placeholder={UI_LABELS.SELECT_LOCATION}
                    onSelectionChange={() => setLocation}
                    defaultItems={provinces}
                    variant="bordered"
                    defaultSelectedKey={location}
                  >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
                  <Select
                    label={UI_LABELS.LANGUAGES_SPOKEN}
                    labelPlacement="outside"
                    aria-label="Select Languages Spoken"
                    variant="bordered"
                    selectionMode="multiple"
                    selectedKeys={languagesSpoken}
                    onSelectionChange={(keys) =>
                      setLanguagesSpoken(Array.from(keys).map(String) as LanguagesSpoken)
                    }
                    className="w-full"
                    placeholder={UI_LABELS.SELECT_LANGUAGES}
                  >
                    {languages.map((lang) => (
                      <SelectItem
                        key={lang.value}
                        className={`${
                          (languagesSpoken as string[]).includes(lang.value)
                            ? 'text-primary'
                            : 'text-neutral-80 hover:text-secondary'
                        }`}
                      >
                        {lang.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label={UI_LABELS.SKILL_OFFERED}
                    labelPlacement="outside"
                    aria-label="Select Skill Offered"
                    variant="bordered"
                    selectionMode="multiple"
                    selectedKeys={skillOffered}
                    onSelectionChange={(keys) =>
                      setSkillOffered(Array.from(keys).map(String) as SkillOffered)
                    }
                    className="w-full"
                    placeholder={UI_LABELS.SELECT_SKILL_OFFERED}
                  >
                    {skills.map((skill) => (
                      <SelectItem
                        key={skill.value}
                        className={`${
                          (skillOffered as string[]).includes(skill.value)
                            ? 'text-primary'
                            : 'text-neutral-80 hover:text-secondary'
                        }`}
                      >
                        {skill.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label={UI_LABELS.SDGS_FOCUS_EXPERTISES}
                    labelPlacement="outside"
                    aria-label="Select SDGs Focus Expertises"
                    variant="bordered"
                    selectionMode="multiple"
                    selectedKeys={sdgFocusExpertises}
                    onSelectionChange={(keys) =>
                      setSdgFocusExpertises(Array.from(keys).map(String) as SDGs)
                    }
                    className="w-full"
                    placeholder={UI_LABELS.SELECT_SDGS_EXPERTISES}
                  >
                    {sdgGoals.map((sdg) => (
                      <SelectItem
                        key={sdg.value}
                        className={`${
                          (sdgFocusExpertises as string[]).includes(sdg.value)
                            ? 'text-primary'
                            : 'text-neutral-80 hover:text-secondary'
                        }`}
                      >
                        {sdg.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-80 mb-1">{UI_LABELS.DESCRIPTION}</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-20 text-secondary text-sm resize-none focus:outline-none focus:border-secondary transition-colors"
                      placeholder={UI_LABELS.DESCRIPTION}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="secondary-md" onClick={onOpenChange}>
                      {UI_LABELS.CANCEL}
                    </Button>
                    <Button variant="primary-md" onClick={onUpdateProfileClick}>
                      {UI_LABELS.UPDATE_PROFILE}
                    </Button>
                  </div>
                </Tab>
                <Tab
                  key="advanced"
                  title={UI_LABELS.ADVANCED}
                  className="w-full flex flex-col gap-2 py-3"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-sm text-secondary">
                        {UI_LABELS.DELETE_PROFILE}
                      </p>
                      <p className="text-neutral-50 font-normal text-xs">
                        {UI_LABELS.DELETE_PROFILE_DESCRIPTION}
                      </p>
                    </div>
                    <Button
                      variant="warning-md"
                      onClick={onOpenDeleteProfileModal}
                      className="w-32"
                    >
                      {UI_LABELS.DELETE_PROFILE}
                    </Button>
                  </div>
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
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default MentorSettingModal;
