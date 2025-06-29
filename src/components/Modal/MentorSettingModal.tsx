/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Tabs, Tab, Button, Divider, Avatar, addToast, useDisclosure } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import React, { useState, useEffect } from "react";
import { uploadAttachemt } from "@/apis/upload";
import { mentor_profile_update, mentor_profile_delete } from "@/apis/mentor-profile";
import { Mentor } from "@/interfaces/MentorProfile";
import LabelWithTextarea from "@/components/FormInput/LabelWithTextarea";
import sdgGoals from "@/utils/data/sdgGoals.json";
import provinces from "@/utils/data/provinces.json";
import { UPLOAD_OWNER_TYPE } from "@/constants/upload";
import { LanguagesSpoken, SDGs } from '@/constants/common';
import languages from '@/utils/data/languages.json';
import { SkillOffered } from '@/constants/skillOffered';
import skills from '@/utils/data/skillOffered.json';
import { Select, SelectItem } from "@heroui/react";
import DeleteProfileModal from "./DeleteProfileModal";
import HideProfileModal from "./HideProfileModal";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";

interface SettingModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    mentor: Mentor;
    onFetchMentorProfile: () => Promise<void>;
}

const MentorSettingModal: React.FC<SettingModalProps> = ({ isOpen, onOpenChange, mentor, onFetchMentorProfile }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string>(mentor.avtUrl || "");
    const [mentorName, setMentorName] = useState<string>(mentor.name || "");
    const [mentorUsername, setMentorUsername] = useState<string>(mentor.mentorUsername || "");
    const [location, setLocation] = useState<string>(mentor.locationBased || "");
    const [description, setDescription] = useState<string>(mentor.description || "");
    const [sdgFocusExpertises, setSdgFocusExpertises] = useState<string[]>(mentor.sdgFocusExpertises || []);
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
    const [marketFocusExpertise, setMarketFocusExpertise] = useState<string>(mentor.marketFocusExpertise || '');
    const [experienceWithFundingStage, setExperienceWithFundingStage] = useState<string[]>(mentor.experienceWithFundingStage || []);
    const [yearOfProfessionalExperience, setYearOfProfessionalExperience] = useState<number>(mentor.yearOfProfessionalExperience || 0);
    const [currentWorkplace, setCurrentWorkplace] = useState<string>(mentor.currentWorkplace || '');
    const [currentPosition, setCurrentPosition] = useState<string>(mentor.currentPosition || '');
    const [industryFocus, setIndustryFocus] = useState<string[]>(mentor.industryFocus || []);
    const [profilePicture, setProfilePicture] = useState('');
    const [uploadedPictureId, setUploadedPictureId] = useState('');

    const { isOpen: isDeleteProfileModalOpen, onOpen: onOpenDeleteProfileModal, onOpenChange: onOpenChangeDeleteProfileModal } = useDisclosure();
    const { isOpen: isHideProfileModalOpen, onOpen: onOpenHideProfileModal, onOpenChange: onOpenChangeHideProfileModal } = useDisclosure();

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
                await mentor_profile_update(
                    mentor.id, requestBody
                );
                addToast({
                    title: 'Profile updated successfully',
                    color: 'success',
                    timeout: 3000,
                });
                await onFetchMentorProfile();
            } catch (err) {
                setError("Failed to update the profile. Please try again.");
                addToast({
                    title: 'Failed to update the profile',
                    color: 'danger',
                    timeout: 3000,
                });
            } finally {
                setLoading(false);
                onOpenChange();
            }
        }
    }

    const handleHideProfileClick = async () => {
        if (mentor.id) {
            setLoading(true);
            const requestBody = {
                isHide: !mentor.isHide,
            };

            try {
                await mentor_profile_update(
                    mentor.id, requestBody
                );
                if (requestBody.isHide) {
                    addToast({
                        title: 'Profile has been hidden successfully',
                        color: 'success',
                        timeout: 3000,
                    });
                } else {
                    addToast({
                        title: 'Profile has been unhidden successfully',
                        color: 'success',
                        timeout: 3000,
                    });
                }
            } catch (err) {
                if (requestBody.isHide) {
                    addToast({
                        title: 'Failed to hide the profile',
                        color: 'danger',
                        timeout: 3000,
                    });
                } else {
                    addToast({
                        title: 'Failed to unhide the profile',
                        color: 'danger',
                        timeout: 3000,
                    });
                }
            } finally {
                setLoading(false);
                onOpenChange();
            }

        }
    }

    const handleDeleteProfileClick = async () => {
        if (mentor.id) {
            setLoading(true);
            try {
                await mentor_profile_delete(
                    mentor.id
                );
                addToast({
                    title: 'Profile has been deleted successfully',
                    color: 'success',
                    timeout: 3000,
                });
            } catch (err) {
                addToast({
                    title: 'Failed to delete the profile',
                    color: 'danger',
                    timeout: 3000,
                });
            } finally {
                setLoading(false);
                onOpenChange();
            }

        }
    }

    const onImageUpload = (fileUrl: string, fileId: string) => {
        setProfilePicture(fileUrl);
        setUploadedPictureId(fileId);
    }

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
                    title: 'Image uploaded successfully',
                    color: 'success',
                    timeout: 3000,
                });
            } catch (err) {
                setError("Failed to upload the image. Please try again.");
                addToast({
                    title: 'Failed to upload the image',
                    color: 'danger',
                    timeout: 3000,
                });
            } finally {
                setLoading(false);
                event.target.files = null;
            }
        } else {
            setError("No file selected. Please choose an image file.");
            addToast({
                title: 'No file selected. Please choose an image file.',
                color: 'danger',
                timeout: 3000,
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
                                    className="bg-white"
                                />
                                <div className="flex flex-col justify-center">
                                    <p className="font-semibold text-lg text-gray-800">{mentor?.name}</p>
                                    <p className="text-gray-400 font-normal text-md">Mentor Setting</p>
                                </div>
                            </div>
                        </ModalHeader>
                        <Divider />
                        <ModalBody>
                            <Tabs aria-label="Options" variant="light" color="primary" isVertical={true} className="py-2 pr-4 mr-4 border-r-1 border-gray-200">
                                <Tab key="general" title="General" className="w-full flex flex-col gap-2 py-2">
                                    <div className="font-semibold text-lg text-empacts">Basic information</div>
                                    <Divider />
                                    <div className="flex gap-4">
                                        <Avatar
                                            alt="heroui logo"
                                            src={image}
                                            size="sm"
                                            radius="full"
                                            isBordered
                                            color="primary"
                                            className="bg-white"
                                        />
                                        <div className="flex flex-col justify-center items-center">
                                            <label htmlFor="profile-upload" className="cursor-pointer">
                                                <p className="font-semibold text-sm text-[#3979DA]">Change profile photo</p>
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
                                        label="Mentor name"
                                        content={mentorName}
                                        setContent={setMentorName}
                                        minRows={1}
                                        placeholder="Mentor name"
                                    />
                                    <LabelWithTextarea
                                        label="Mentor username"
                                        content={mentorUsername}
                                        setContent={setMentorUsername}
                                        minRows={1}
                                        placeholder="Mentor username"
                                    />
                                    <Autocomplete
                                        isVirtualized={false}
                                        labelPlacement="outside"
                                        label="Location"
                                        placeholder="Select your location"
                                        onSelectionChange={() => setLocation}
                                        defaultItems={provinces}
                                        variant="bordered"
                                        defaultSelectedKey={location}
                                    >
                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                    <Select
                                        label="Languages Spoken"
                                        labelPlacement="outside"
                                        aria-label="Select Languages Spoken"
                                        variant="bordered"
                                        selectionMode="multiple"
                                        selectedKeys={languagesSpoken}
                                        onSelectionChange={(keys) =>
                                            setLanguagesSpoken(Array.from(keys).map(String) as LanguagesSpoken)
                                        }
                                        className="w-full"
                                        placeholder="Select languages"
                                    >
                                        {languages.map((lang) => (
                                            <SelectItem
                                                key={lang.value}
                                                className={`${(languagesSpoken as string[]).includes(lang.value)
                                                    ? "text-empacts"
                                                    : "text-gray-700 hover:text-gray-900"
                                                    }`}
                                            >
                                                {lang.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Skill Offered"
                                        labelPlacement="outside"
                                        aria-label="Select Skill Offered"
                                        variant="bordered"
                                        selectionMode="multiple"
                                        selectedKeys={skillOffered}
                                        onSelectionChange={(keys) =>
                                            setSkillOffered(Array.from(keys).map(String) as SkillOffered)
                                        }
                                        className="w-full"
                                        placeholder="Select Skill Offered"
                                    >
                                        {skills.map((skill) => (
                                            <SelectItem
                                                key={skill.value}
                                                className={`${(skillOffered as string[]).includes(skill.value)
                                                    ? "text-empacts"
                                                    : "text-gray-700 hover:text-gray-900"
                                                    }`}
                                            >
                                                {skill.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="SDGs Focus Expertises"
                                        labelPlacement="outside"
                                        aria-label="Select SDGs Focus Expertises"
                                        variant="bordered"
                                        selectionMode="multiple"
                                        selectedKeys={sdgFocusExpertises}
                                        onSelectionChange={(keys) =>
                                            setSdgFocusExpertises(Array.from(keys).map(String) as SDGs)
                                        }
                                        className="w-full"
                                        placeholder="Select SDGs Focus Expertises"
                                    >
                                        {sdgGoals.map((sdg) => (
                                            <SelectItem
                                                key={sdg.value}
                                                className={`${(sdgFocusExpertises as string[]).includes(sdg.value)
                                                    ? "text-empacts"
                                                    : "text-gray-700 hover:text-gray-900"
                                                    }`}
                                            >
                                                {sdg.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            rows={5}
                                            className="border border-gray-200 rounded-lg min-h-[120px] p-3 bg-white text-black text-sm resize-none focus:outline-none focus:border-black transition-colors"
                                            placeholder="Description"
                                        />
                                    </div>

                                    {/* <div className="font-semibold text-lg text-empacts">Advanced Information</div>
                                    <Divider /> */}

                                    <div className="flex justify-end gap-4">
                                        <Button className="border-2" variant="light" onPress={onOpenChange}>Cancel</Button>
                                        <Button className="bg-success text-white" onPress={onUpdateProfileClick}>Update profile</Button>
                                    </div>
                                </Tab>
                                <Tab key="advanced" title="Advanced" className="w-full flex flex-col gap-2 py-3">
                                    {/* {!mentor.isHide ? (
                                        <div className="flex justify-between">
                                            <div className="flex flex-col justify-center">
                                                <p className="font-semibold text-sm text-gray-800">Hide Profile</p>
                                                <p className="text-gray-400 font-normal text-xs">Hide your profile from search results across entire platform.</p>
                                            </div>
                                            <Button className="bg-tertiary text-white w-32" variant="solid" onPress={onOpenHideProfileModal}>Hide profile</Button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between">
                                            <div className="flex flex-col justify-center">
                                                <p className="font-semibold text-sm text-gray-800">Profile is hidden</p>
                                                <p className="text-gray-400 font-normal text-xs">Your profile is currently hidden from search results.</p>
                                            </div>
                                            <Button className="bg-empacts text-white w-32" variant="solid" onPress={onOpenHideProfileModal}>Unhide profile</Button>
                                        </div>
                                    )} */}
                                    <div className="flex justify-between">
                                        <div className="flex flex-col justify-center">
                                            <p className="font-semibold text-sm text-gray-800">Delete Profile</p>
                                            <p className="text-gray-400 font-normal text-xs">Once deleted, it will be gone forever. Please be certain.</p>
                                        </div>
                                        <Button className="bg-tertiary text-white w-32" variant="solid" onPress={onOpenDeleteProfileModal}>Delete profile</Button>
                                    </div>
                                    <HideProfileModal isOpen={isHideProfileModalOpen} onOpenChange={onOpenChangeHideProfileModal} onHideProfile={handleHideProfileClick} isHide={mentor.isHide} />
                                    <DeleteProfileModal isOpen={isDeleteProfileModalOpen} onOpenChange={onOpenChangeDeleteProfileModal} onDeleteProfile={handleDeleteProfileClick} />
                                </Tab>
                            </Tabs>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default MentorSettingModal;
