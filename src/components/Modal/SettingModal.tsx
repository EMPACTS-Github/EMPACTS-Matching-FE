"use client";
import { Tabs, Tab, Button, Input, Divider, Avatar, addToast } from "@heroui/react";
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@heroui/autocomplete";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { upload_image } from "@/apis/upload";
import { Startup } from "@/interfaces/StartupProfile";
import LabelWithTextarea from "@/components/FormInput/LabelWithTextarea";
import ImageGallery from "@/containers/StartupProfile/ImageGallery";
import { getProvince } from "@/utils/getProvince";
import { getSDGGoal } from "@/utils/getSDGGoal";
import sdgGoals from "@/utils/data/sdgGoals.json";
import provinces from "@/utils/data/provinces.json";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { Textarea } from "@heroui/input";
interface SettingModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    startup: Startup | undefined;
}

const SettingModal: React.FC<SettingModalProps> = ({ isOpen, onOpenChange, startup }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const [image, setImage] = useState<string>(startup?.avt_url || "");
    const [startupName, setStartupName] = useState<string>(startup?.name || "");
    const [location, setLocation] = useState<string>(startup?.location_based || "");
    const [description, setDescription] = useState<string>(startup?.description || "");
    const [sdgGoal, setSdgGoal] = useState<string>(startup?.category || "");
    const [bio, setBio] = useState<string>("");

    const images: string[] = [
        // "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
        // "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
        // "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
    ];

    // Đồng bộ state với props khi startup thay đổi
    useEffect(() => {
        if (startup?.name) {
            setStartupName(startup.name);
        }
        if (startup?.location_based) {
            setLocation(startup.location_based);
        }
        if (startup?.avt_url) {
            setImage(startup.avt_url);
        }
        if (startup?.description) {
            setDescription(startup.description);
        }
        if (startup?.category) {
            setSdgGoal(startup.category);
        }
        // if (startup?.bio) {
        //     setBio(startup.bio);
        // }
    }, [startup]);

    const handleHideProfileClick = () => {
        console.log(sdgGoal)
        console.log("1")
    }
    const handleDeleteProfileClick = () => {
        console.log("2")
    }
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLoading(true); // Set loading to true
            try {
                const response = await upload_image(file);
                setImage(response.fileUrl);
                setError(null);
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
                setLoading(false); // Set loading to false
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
    return <Modal
        isDismissable={false}
        size="5xl"
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
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
                                radius="sm"
                            />
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold text-lg text-gray-800">{startup?.name}</p>
                                <p className="text-gray-400 font-normal text-md">Startup Setting</p>
                            </div>
                        </div>
                    </ModalHeader>
                    <Divider />
                    <ModalBody>
                        <Tabs aria-label="Options" variant="light" isVertical={true} className="py-2">
                            <Tab key="general" title="General" className="w-full flex flex-col gap-2 py-2">
                                <div className="font-semibold text-lg text-empacts">Basic information</div>
                                <Divider />
                                <div className="flex gap-4">
                                    <Avatar
                                        alt="heroui logo"
                                        src={image}
                                        size="sm"
                                        radius="full"
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
                                    label="Startup name"
                                    content={startupName}
                                    setContent={setStartupName}
                                    minRows={1}
                                    placeholder="Startup name"
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
                                <Autocomplete
                                    labelPlacement="outside"
                                    label="SDG Goals"
                                    placeholder="Select SDG Goals"
                                    onSelectionChange={() => setSdgGoal}
                                    defaultItems={sdgGoals}
                                    variant="bordered"
                                    defaultSelectedKey={sdgGoal}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                                <LabelWithTextarea
                                    label="Bio"
                                    content=""
                                    setContent={setBio}
                                    minRows={1}
                                    placeholder="Bio"
                                />
                                <LabelWithTextarea
                                    label="Description"
                                    content={description}
                                    setContent={setDescription}
                                    minRows={3}
                                    placeholder="Description"
                                />

                                <div className="font-semibold text-lg text-empacts">Media</div>
                                <Divider />
                                <ImageGallery images={images} />

                                <div className="font-semibold text-lg text-empacts">Documentation</div>
                                <Divider />

                                <div className="font-semibold text-lg text-empacts">Advanced Information</div>
                                <Divider />


                            </Tab>
                            <Tab key="advanced" title="Advanced" className="w-full flex flex-col gap-2 py-3">
                                <div className="flex justify-between">
                                    <div className="flex flex-col justify-center">
                                        <p className="font-semibold text-sm text-gray-800">Hide Profile</p>
                                        <p className="text-gray-400 font-normal text-xs">Hide your profile from search results across entire platform.</p>
                                    </div>
                                    <Button className="bg-danger text-white" variant="solid" onPress={handleHideProfileClick}>Hide profile</Button>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex flex-col justify-center">
                                        <p className="font-semibold text-sm text-gray-800">Delete Profile</p>
                                        <p className="text-gray-400 font-normal text-xs">Once deleted, it will be gone forever. Please be certain.</p>
                                    </div>
                                    <Button className="bg-danger text-white" variant="solid" onPress={handleDeleteProfileClick}>Delete profile</Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </ModalBody>
                    <Divider />
                    <ModalFooter className="flex justify-end">
                        <Button className="border-2" variant="light" onPress={onOpenChange}>Cancel</Button>
                        <Button className="bg-success text-white" onPress={onOpenChange}>Update profile</Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}
export default SettingModal;
