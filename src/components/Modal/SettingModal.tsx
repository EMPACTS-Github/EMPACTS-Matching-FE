/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Tabs, Tab, Button, Divider, Avatar, addToast, useDisclosure } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import React, { useState, useEffect } from "react";
import { uploadAttachemt, updateAttachment, getStartupDocuments } from "@/apis/upload";
import { startup_profile_update, startup_profile_delete } from "@/apis/startup-profile";
import { Startup } from "@/interfaces/StartupProfile";
import LabelWithTextarea from "@/components/FormInput/LabelWithTextarea";
import ImageGallery from "./ImageGallery";
import DocumentBody from "./DocumentBody";
import LabelStartAndSwitchEnd from "@/components/Switch/LabelStartAndSwitchEnd";
import sdgGoals from "@/utils/data/sdgGoals.json";
import provinces from "@/utils/data/provinces.json";
import { UPLOAD_OWNER_TYPE } from "@/constants/upload";
import DeleteProfileModal from "./DeleteProfileModal";
import HideProfileModal from "./HideProfileModal";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { isDocumentFile, isImageFile } from "@/services/upload";
import { IDocument } from "@/interfaces/upload";
import { start } from "repl";

interface SettingModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    startup: Startup;
    onFetchStartupProfile: () => Promise<void>;
    onFetchStartupDocuments: () => Promise<void>;
}

const SettingModal: React.FC<SettingModalProps> = ({ isOpen, onOpenChange, startup, onFetchStartupProfile, onFetchStartupDocuments }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const [image, setImage] = useState<string>(startup.avtUrl || "");
    const [startupName, setStartupName] = useState<string>(startup.name || "");
    const [startupUsername, setStartupUsername] = useState<string>(startup.startupUsername || "");
    const [location, setLocation] = useState<string>(startup.locationBased || "");
    const [description, setDescription] = useState<string>(startup.description || "");
    const [sdgGoal, setSdgGoal] = useState<string>(startup.sdgGoal || "");
    const [profilePicture, setProfilePicture] = useState('');
    const [uploadedPictureId, setUploadedPictureId] = useState('');

    const [startupImages, setStartupImages] = useState<IDocument[]>([]);
    const [startupDocuments, setStartupDocuments] = useState<IDocument[]>([]);
    const [selectedImage, setSelectedImage] = useState<IDocument | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

    const { isOpen: isDeleteProfileModalOpen, onOpen: onOpenDeleteProfileModal, onOpenChange: onOpenChangeDeleteProfileModal } = useDisclosure();
    const { isOpen: isHideProfileModalOpen, onOpen: onOpenHideProfileModal, onOpenChange: onOpenChangeHideProfileModal } = useDisclosure();

    // Đồng bộ state với props khi startup thay đổi
    useEffect(() => {
        if (startup.name) {
            setStartupName(startup.name);
        }
        if (startup.locationBased) {
            setLocation(startup.locationBased);
        }
        if (startup.avtUrl) {
            setImage(startup.avtUrl);
        }
        if (startup.description) {
            setDescription(startup.description);
        }
        if (startup.sdgGoal) {
            setSdgGoal(startup.sdgGoal);
        }
        if (startup.startupUsername) {
            setStartupUsername(startup.startupUsername);
        }
        if (startup.avtUrl) {
            setProfilePicture(startup.avtUrl);
        }
    }, [startup]);

    const onUpdateProfileClick = async () => {
        if (startup.id) {
            setLoading(true);
            const requestBody = {
                name: startupName,
                startupUsername: startupUsername,
                locationBased: location,
                description: description,
                sdgGoal: sdgGoal,
                avtUrl: profilePicture ? profilePicture : startup.avtUrl,
            };

            try {
                await startup_profile_update(
                    startup.id, requestBody
                );
                addToast({
                    title: 'Profile updated successfully',
                    color: 'success',
                    timeout: 3000,
                });
                await onFetchStartupProfile();
            } catch (err) {
                addToast({
                    title: 'Failed to update profile',
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
        if (startup.id) {
            setLoading(true);
            const requestBody = {
                isHide: !startup.isHide,
            };

            try {
                await startup_profile_update(
                    startup.id, requestBody
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
                await onFetchStartupProfile();
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
        if (startup.id) {
            setLoading(true);
            try {
                await startup_profile_delete(
                    startup.id
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
                const response = await uploadAttachemt({ file, ownerId: startup.id, ownerType: UPLOAD_OWNER_TYPE.STARTUP });
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

    const handleUploadNewStartupAttachment = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const response = await uploadAttachemt({ file, ownerId: startup.id, ownerType: UPLOAD_OWNER_TYPE.STARTUP });
                addToast({
                    title: 'Attachement uploaded successfully',
                    color: 'success',
                    timeout: 3000,
                });
                const newDocument: IDocument = {
                    id: response.data.id,
                    attachmentUrl: response.data.attachmentUrl,
                    attachmentTitle: response.data.attachmentTitle,
                    type: response.data.type,
                    size: response.data.size,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt,
                    ownerId: startup.id,
                    ownerType: UPLOAD_OWNER_TYPE.STARTUP,
                }
                if (isImageFile(response.data.type)) {
                    setStartupImages([...startupImages, newDocument]);
                    setSelectedImage(newDocument);
                } else {
                    setStartupDocuments([...startupDocuments, newDocument]);
                }
                await onFetchStartupDocuments();
            } catch (err) {
                addToast({
                    title: 'Failed to upload the image',
                    color: 'danger',
                    timeout: 3000,
                });
            } finally {
                event.target.files = null;
            }
        }
    }

    const handleSelectImage = (image: IDocument) => {
        setSelectedImage(image);
    }

    const handleSelectDocument = (document: IDocument) => {
        setSelectedDocument(document);
    }

    const handleDeleteAttachment = async (attachment: IDocument | null) => {
        if (!attachment) return;
        try {
            await updateAttachment({
                id: attachment.id,
                ownerId: startup.id,
                ownerType: UPLOAD_OWNER_TYPE.STARTUP,
                isDeleted: true,
            });
            if (isImageFile(attachment.type)) {
                const newStartupImages = startupImages.filter((image) => image.id !== attachment.id);
                setStartupImages(newStartupImages);
                setSelectedImage(newStartupImages[0] || null);
            } else {
                const newStartupDocuments = startupDocuments.filter((doc) => doc.id !== attachment.id);
                setStartupDocuments(newStartupDocuments);
                setSelectedDocument(newStartupDocuments[0] || null);
            }
            addToast({
                title: 'Attachment deleted successfully',
                color: 'success',
                timeout: 3000,
            });
        } catch (error) {
            addToast({
                title: 'Failed to delete the attachment',
                color: 'danger',
                timeout: 3000,
            });
        }
    }

    const fetchStartupDocuments = async () => {
        try {
            const response = await getStartupDocuments({
                ownerId: startup.id,
                ownerType: UPLOAD_OWNER_TYPE.STARTUP,
                limit: 100,
                page: 1,
            });
            const allDocuments = response.data;
            const images = allDocuments.filter((document: IDocument) => isImageFile(document.type));
            const documents = allDocuments.filter((document: IDocument) => isDocumentFile(document.type));
            setStartupImages(images);
            setStartupDocuments(documents);
            setSelectedImage(images[0] || null);
            setSelectedDocument(documents[0] || null);
        } catch (error) {
            addToast({
                title: 'Oops! Something went wrong',
                color: 'danger',
                timeout: 3000,
            });
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchStartupDocuments();
        }

        return () => {
            setStartupImages([]);
            setStartupDocuments([]);
        }
    }, [isOpen]);

    return <Modal
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
                                <p className="font-semibold text-lg text-gray-800">{startup?.name}</p>
                                <p className="text-gray-400 font-normal text-md">Startup Setting</p>
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
                                    label="Startup name"
                                    content={startupName}
                                    setContent={setStartupName}
                                    minRows={1}
                                    placeholder="Startup name"
                                />
                                <LabelWithTextarea
                                    label="Startup username"
                                    content={startupUsername}
                                    setContent={setStartupUsername}
                                    minRows={1}
                                    placeholder="Startup username"
                                />
                                <Autocomplete
                                    isVirtualized={false}
                                    labelPlacement="outside"
                                    label="Location"
                                    placeholder="Select your location"
                                    onSelectionChange={(key) => {
                                        let selectedLocation = provinces.find((province) => province.value === key);
                                        setLocation(selectedLocation?.value || "");
                                    }}
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
                                    onSelectionChange={(key) => {
                                        let selectedSdgGoal = sdgGoals.find((sdgGoal) => sdgGoal.value === key);
                                        setSdgGoal(selectedSdgGoal?.value || "");
                                    }}
                                    defaultItems={sdgGoals}
                                    variant="bordered"
                                    defaultSelectedKey={sdgGoal}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        rows={5}
                                        className="border border-gray-200 rounded-lg min-h-[120px] p-3 bg-white text-black resize-none focus:outline-none focus:border-black transition-colors"
                                        placeholder="Description"
                                    />
                                </div>

                                <div className="font-semibold text-lg text-empacts">Media</div>
                                <Divider />
                                <ImageGallery
                                    images={startupImages}
                                    selectedImage={selectedImage}
                                    onUploadNewImage={handleUploadNewStartupAttachment}
                                    onSelectImage={handleSelectImage}
                                    onDeleteAttachment={handleDeleteAttachment}
                                />

                                <div className="font-semibold text-lg text-empacts">Documentation</div>
                                <Divider />
                                <DocumentBody
                                    files={startupDocuments}
                                    selectedFile={selectedDocument}
                                    onSelectFile={handleSelectDocument}
                                    onDeleteAttachment={handleDeleteAttachment}
                                    onUploadNewFile={handleUploadNewStartupAttachment}
                                />

                                <div className="font-semibold text-lg text-empacts">Advanced Information</div>
                                <Divider />
                                <LabelStartAndSwitchEnd
                                    label="Active user"
                                    checked={startup.haveActiveUse ? true : false}
                                    onChange={() => { }}
                                />
                                <LabelStartAndSwitchEnd
                                    label="Lastest Revenue"
                                    checked={startup.revenue ? true : false}
                                    onChange={() => { }}
                                />
                                <LabelStartAndSwitchEnd
                                    label="Legal Equity"
                                    checked={startup.legalEquityDetail ? true : false}
                                    onChange={() => { }}
                                />
                                <LabelStartAndSwitchEnd
                                    label="Investment"
                                    checked={startup.investmentDetail ? true : false}
                                    onChange={() => { }}
                                />
                                <LabelStartAndSwitchEnd
                                    label="Fundraising"
                                    checked={startup.fundraisingDetail ? true : false}
                                    onChange={() => { }}
                                />
                                <Divider />
                                <div className="flex justify-end gap-4">
                                    <Button className="border-2" variant="light" onPress={onOpenChange}>Cancel</Button>
                                    <Button className="bg-success text-white" onPress={onUpdateProfileClick}>Update profile</Button>
                                </div>
                            </Tab>
                            <Tab key="advanced" title="Advanced" className="w-full flex flex-col gap-2 py-3">
                                {!startup.isHide ? (
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
                                )}
                                <div className="flex justify-between">
                                    <div className="flex flex-col justify-center">
                                        <p className="font-semibold text-sm text-gray-800">Delete Profile</p>
                                        <p className="text-gray-400 font-normal text-xs">Once deleted, it will be gone forever. Please be certain.</p>
                                    </div>
                                    <Button className="bg-tertiary text-white w-32" variant="solid" onPress={onOpenDeleteProfileModal}>Delete profile</Button>
                                </div>
                                <HideProfileModal isOpen={isHideProfileModalOpen} onOpenChange={onOpenChangeHideProfileModal} onHideProfile={handleHideProfileClick} isHide={startup.isHide} />
                                <DeleteProfileModal isOpen={isDeleteProfileModalOpen} onOpenChange={onOpenChangeDeleteProfileModal} onDeleteProfile={handleDeleteProfileClick} />
                            </Tab>
                        </Tabs>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    </Modal>
}
export default SettingModal;
