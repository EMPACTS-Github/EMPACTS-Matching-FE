/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Tabs, Tab, Divider, Avatar, addToast, useDisclosure } from '@heroui/react';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import React, { useState, useEffect } from 'react';
import { uploadAttachemt, updateAttachment, getStartupDocuments } from '@/apis/upload';
import { startup_profile_update, startup_profile_delete } from '@/apis/startup-profile';
import { Startup } from '@/interfaces/StartupProfile';
import LabelWithTextarea from '@/components/Input/LabelWithTextarea';
import ImageGallery from './ImageGallery';
import DocumentBody from './DocumentBody';
import LabelStartAndSwitchEnd from '@/components/Switch/LabelStartAndSwitchEnd';
import sdgGoals from '@/utils/data/sdgGoals.json';
import provinces from '@/utils/data/provinces.json';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { PROFILE_MESSAGES, UI_LABELS } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import DeleteProfileModal from './DeleteProfileModal';
import HideProfileModal from './HideProfileModal';
import Button from '@/components/Button/Button';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { isDocumentFile, isImageFile } from '@/services/upload';
import { IDocument } from '@/interfaces/upload';
import { start } from 'repl';

interface SettingModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  startup: Startup;
  onFetchStartupProfile: () => Promise<void>;
  onFetchStartupDocuments: () => Promise<void>;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onOpenChange,
  startup,
  onFetchStartupProfile,
  onFetchStartupDocuments,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [image, setImage] = useState<string>(startup.avtUrl || '');
  const [startupName, setStartupName] = useState<string>(startup.name || '');
  const [startupUsername, setStartupUsername] = useState<string>(startup.startupUsername || '');
  const [location, setLocation] = useState<string>(startup.locationBased || '');
  const [description, setDescription] = useState<string>(startup.description || '');
  const [sdgGoal, setSdgGoal] = useState<string>(startup.sdgGoal || '');
  const [profilePicture, setProfilePicture] = useState('');
  const [uploadedPictureId, setUploadedPictureId] = useState('');

  const [startupImages, setStartupImages] = useState<IDocument[]>([]);
  const [startupDocuments, setStartupDocuments] = useState<IDocument[]>([]);
  const [selectedImage, setSelectedImage] = useState<IDocument | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

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
        await startup_profile_update(startup.id, requestBody);
        addToast({
          title: PROFILE_MESSAGES.PROFILE_UPDATED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        await onFetchStartupProfile();
      } catch (err) {
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
    if (startup.id) {
      setLoading(true);
      const requestBody = {
        isHide: !startup.isHide,
      };

      try {
        await startup_profile_update(startup.id, requestBody);
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
        await onFetchStartupProfile();
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
    if (startup.id) {
      setLoading(true);
      try {
        await startup_profile_delete(startup.id);
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
        const response = await uploadAttachemt({
          file,
          ownerId: startup.id,
          ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        });
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

  const handleUploadNewStartupAttachment = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadAttachemt({
          file,
          ownerId: startup.id,
          ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        });
        addToast({
          title: PROFILE_MESSAGES.ATTACHMENT_UPLOADED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
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
        };
        if (isImageFile(response.data.type)) {
          setStartupImages([...startupImages, newDocument]);
          setSelectedImage(newDocument);
        } else {
          setStartupDocuments([...startupDocuments, newDocument]);
        }
        await onFetchStartupDocuments();
      } catch (err) {
        addToast({
          title: PROFILE_MESSAGES.IMAGE_UPLOAD_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        event.target.files = null;
      }
    }
  };

  const handleSelectImage = (image: IDocument) => {
    setSelectedImage(image);
  };

  const handleSelectDocument = (document: IDocument) => {
    setSelectedDocument(document);
  };

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
        title: PROFILE_MESSAGES.ATTACHMENT_DELETED_SUCCESS,
        color: TOAST_COLORS.SUCCESS,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } catch (error) {
      addToast({
        title: PROFILE_MESSAGES.ATTACHMENT_DELETE_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    }
  };

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
        title: PROFILE_MESSAGES.GENERAL_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStartupDocuments();
    }

    return () => {
      setStartupImages([]);
      setStartupDocuments([]);
    };
  }, [isOpen]);

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
                  <p className="font-semibold text-lg text-secondary">{startup?.name}</p>
                  <p className="text-neutral-50 font-normal text-md">{UI_LABELS.STARTUP_SETTING}</p>
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
                <Tab key="general" title={UI_LABELS.GENERAL} className="w-full flex flex-col gap-2 py-2">
                  <div className="font-semibold text-lg text-primary">{UI_LABELS.BASIC_INFORMATION}</div>
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
                        <p className="font-semibold text-sm text-primary">{UI_LABELS.CHANGE_PROFILE_PHOTO}</p>
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
                    label={UI_LABELS.STARTUP_NAME}
                    content={startupName}
                    setContent={setStartupName}
                    minRows={1}
                    placeholder={UI_LABELS.STARTUP_NAME}
                  />
                  <LabelWithTextarea
                    label={UI_LABELS.STARTUP_USERNAME}
                    content={startupUsername}
                    setContent={setStartupUsername}
                    minRows={1}
                    placeholder={UI_LABELS.STARTUP_USERNAME}
                  />
                  <Autocomplete
                    isVirtualized={false}
                    labelPlacement="outside"
                    label={UI_LABELS.LOCATION}
                    placeholder={UI_LABELS.SELECT_LOCATION}
                    onSelectionChange={(key) => {
                      let selectedLocation = provinces.find((province) => province.value === key);
                      setLocation(selectedLocation?.value || '');
                    }}
                    defaultItems={provinces}
                    variant="bordered"
                    defaultSelectedKey={location}
                  >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
                  <Autocomplete
                    labelPlacement="outside"
                    label={UI_LABELS.SDG_GOALS}
                    placeholder={UI_LABELS.SELECT_SDG_GOALS}
                    onSelectionChange={(key) => {
                      let selectedSdgGoal = sdgGoals.find((sdgGoal) => sdgGoal.value === key);
                      setSdgGoal(selectedSdgGoal?.value || '');
                    }}
                    defaultItems={sdgGoals}
                    variant="bordered"
                    defaultSelectedKey={sdgGoal}
                  >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-80 mb-1">{UI_LABELS.DESCRIPTION}</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-20 text-secondary resize-none focus:outline-none focus:border-secondary transition-colors"
                      placeholder={UI_LABELS.DESCRIPTION}
                    />
                  </div>

                  <div className="font-semibold text-lg text-primary">{UI_LABELS.MEDIA}</div>
                  <Divider />
                  <ImageGallery
                    images={startupImages}
                    selectedImage={selectedImage}
                    onUploadNewImage={handleUploadNewStartupAttachment}
                    onSelectImage={handleSelectImage}
                    onDeleteAttachment={handleDeleteAttachment}
                  />

                  <div className="font-semibold text-lg text-primary">{UI_LABELS.DOCUMENTATION}</div>
                  <Divider />
                  <DocumentBody
                    files={startupDocuments}
                    selectedFile={selectedDocument}
                    onSelectFile={handleSelectDocument}
                    onDeleteAttachment={handleDeleteAttachment}
                    onUploadNewFile={handleUploadNewStartupAttachment}
                  />

                  <div className="font-semibold text-lg text-primary">{UI_LABELS.ADVANCED_INFORMATION}</div>
                  <Divider />
                  <LabelStartAndSwitchEnd
                    label={UI_LABELS.ACTIVE_USER}
                    checked={startup.haveActiveUse ? true : false}
                    onChange={() => {}}
                  />
                  <LabelStartAndSwitchEnd
                    label={UI_LABELS.LATEST_REVENUE}
                    checked={startup.revenue ? true : false}
                    onChange={() => {}}
                  />
                  <LabelStartAndSwitchEnd
                    label={UI_LABELS.LEGAL_EQUITY}
                    checked={startup.legalEquityDetail ? true : false}
                    onChange={() => {}}
                  />
                  <LabelStartAndSwitchEnd
                    label={UI_LABELS.INVESTMENT}
                    checked={startup.investmentDetail ? true : false}
                    onChange={() => {}}
                  />
                  <LabelStartAndSwitchEnd
                    label={UI_LABELS.FUNDRAISING}
                    checked={startup.fundraisingDetail ? true : false}
                    onChange={() => {}}
                  />
                  <Divider />
                  <div className="flex justify-end gap-4">
                    <Button variant="secondary-md" onClick={onOpenChange}>
                      {UI_LABELS.CANCEL}
                    </Button>
                    <Button variant="primary-md" onClick={onUpdateProfileClick}>
                      {UI_LABELS.UPDATE_PROFILE}
                    </Button>
                  </div>
                </Tab>
                <Tab key="advanced" title={UI_LABELS.ADVANCED} className="w-full flex flex-col gap-2 py-3">
                  {!startup.isHide ? (
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold text-sm text-secondary">{UI_LABELS.HIDE_PROFILE}</p>
                        <p className="text-neutral-50 font-normal text-xs">
                          {UI_LABELS.HIDE_PROFILE_DESCRIPTION}
                        </p>
                      </div>
                      <Button
                        variant="tertiary-md"
                        onClick={onOpenHideProfileModal}
                        className="w-32"
                      >
                        {UI_LABELS.HIDE_PROFILE}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold text-sm text-secondary">Profile is hidden</p>
                        <p className="text-neutral-50 font-normal text-xs">
                          {UI_LABELS.PROFILE_HIDDEN_DESCRIPTION}
                        </p>
                      </div>
                      <Button
                        variant="primary-md"
                        onClick={onOpenHideProfileModal}
                        className="w-32"
                      >
                        {UI_LABELS.UNHIDE_PROFILE}
                      </Button>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-sm text-secondary">{UI_LABELS.DELETE_PROFILE}</p>
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
                    isHide={startup.isHide}
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
export default SettingModal;
