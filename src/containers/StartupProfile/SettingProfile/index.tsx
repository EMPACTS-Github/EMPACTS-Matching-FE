/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Tabs, Tab, Divider, Avatar, addToast, useDisclosure } from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { uploadAttachemt, updateAttachment, getStartupDocuments, getS3PresignedUrl, uploadToS3ByPresignedUrl } from '@/apis/upload';
import { startupProfileUpdate, startup_profile_delete } from '@/apis/startup-profile';
import { AdvancedInformation } from '@/interfaces/startup';
import { Startup } from '@/interfaces/StartupProfile';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { PROFILE_MESSAGES, UI_LABELS } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';
import { isDocumentFile, isImageFile, isValidAttachmentSize, isValidAttachmentType, normalizeAttachmentType } from '@/services/upload';
import { IDocument } from '@/interfaces/upload';
import CloseIcon from '@/components/Icons/CloseIcon';
import GeneralTab from './General';
import AdvancedTab from './Advanced';

interface SettingModalProps {
  isOpen: boolean;
  startup: Startup;
  onOpenChange: () => void;
  onFetchStartupProfile: () => Promise<void>;
  onFetchStartupDocuments: () => Promise<void>;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  startup,
  onOpenChange,
  onFetchStartupProfile,
  onFetchStartupDocuments,
}) => {
  const [image, setImage] = useState<string>(startup.avtUrl || '');
  const [startupName, setStartupName] = useState<string>(startup.name || '');
  const [location, setLocation] = useState<string>(startup.locationBased || '');
  const [description, setDescription] = useState<string>(startup.description || '');
  const [sdgGoal, setSdgGoal] = useState<string>(startup.sdgGoal || '');
  const [profilePicture, setProfilePicture] = useState('');
  const [advancedInformation, setAdvancedInformation] = useState<AdvancedInformation>({
    activeUser: startup.activeUser?.toString(),
    revenue: startup.revenue?.toString(),
    legalEquityDetail: startup.legalEquityDetail,
    investmentDetail: startup.investmentDetail,
    fundraisingDetail: startup.fundraisingDetail,
  });

  const [startupImages, setStartupImages] = useState<IDocument[]>([]);
  const [startupDocuments, setStartupDocuments] = useState<IDocument[]>([]);
  const [selectedImage, setSelectedImage] = useState<IDocument | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);
  const [pendingUploadAttachments, setPendingUploadAttachments] = useState<File[]>([]);

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

  const updateStartupAttachments = async () => {
    try {
      if (pendingUploadAttachments.length === 0) return;
      await Promise.all(pendingUploadAttachments.map(async (file) => await uploadAttachemt({
        file,
        ownerId: startup.id,
        ownerType: UPLOAD_OWNER_TYPE.STARTUP,
      })));
      addToast({
        title: PROFILE_MESSAGES.ATTACHMENTS_UPLOADED_SUCCESS,
        color: TOAST_COLORS.SUCCESS,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      setPendingUploadAttachments([]);
    } catch (error) {
      addToast({
        title: PROFILE_MESSAGES.ATTACHMENTS_UPLOAD_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    }
  }

  const validateAdvancedInformation = () => {
    const validateActiveUser =
      Number.isNaN(Number(advancedInformation.activeUser)) ||
      Number(advancedInformation.activeUser) < 0;
    const validateRevenue =
      Number.isNaN(Number(advancedInformation.revenue)) ||
      Number(advancedInformation.revenue) < 0;

    if (validateActiveUser) {
      addToast({
        title: PROFILE_MESSAGES.INVALID_ACTIVE_USER,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      return false;
    }

    if (validateRevenue) {
      addToast({
        title: PROFILE_MESSAGES.INVALID_REVENUE,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      return false;
    }

    return true;
  }

  const onUpdateProfileClick = async () => {
    if (startup.id) {
      if (!validateAdvancedInformation()) return;

      let requestBody = {
        name: startupName,
        locationBased: location,
        description: description,
        sdgGoal: sdgGoal,
        avtUrl: profilePicture ? profilePicture : startup.avtUrl,
        activeUser: Number(advancedInformation.activeUser || 0),
        revenue: Number(advancedInformation.revenue || 0),
        legalEquityDetail: advancedInformation?.legalEquityDetail,
        investmentDetail: advancedInformation?.investmentDetail,
        fundraisingDetail: advancedInformation?.fundraisingDetail,
      };

      try {
        await updateStartupAttachments();
        await startupProfileUpdate(startup.id, requestBody);
        addToast({
          title: PROFILE_MESSAGES.PROFILE_UPDATED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        await onFetchStartupProfile();
        await onFetchStartupDocuments();
      } catch (err) {
        addToast({
          title: PROFILE_MESSAGES.PROFILE_UPDATE_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        onOpenChange();
      }
    }
  };

  const handleHideProfileClick = async () => {
    if (startup.id) {
      const requestBody = {
        isHide: !startup.isHide,
      };

      try {
        await startupProfileUpdate(startup.id, requestBody);
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
        onOpenChange();
      }
    }
  };

  const handleDeleteProfileClick = async () => {
    if (startup.id) {
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
        onOpenChange();
      }
    }
  };

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileType = file.type;
        const fileName = file.name;

        const presignedUrlResponse = await getS3PresignedUrl(fileName, fileType);
        const { data: { uploadUrl, fileUrl } } = presignedUrlResponse;
        await uploadToS3ByPresignedUrl(uploadUrl, file);

        setImage(fileUrl);
        setProfilePicture(fileUrl);
        addToast({
          title: PROFILE_MESSAGES.IMAGE_UPLOADED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } catch (err) {
        addToast({
          title: PROFILE_MESSAGES.IMAGE_UPLOAD_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        event.target.files = null;
      }
    } else {
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
        const fileType = file.type.split('/')[1];
        const fileName = file.name;

        if (!isValidAttachmentType(fileType)) {
          addToast({
            title: PROFILE_MESSAGES.INVALID_ATTACHMENT_TYPE,
            color: TOAST_COLORS.DANGER,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
          event.target.files = null;
          return;
        }

        if (!isValidAttachmentSize(file.size)) {
          addToast({
            title: PROFILE_MESSAGES.INVALID_ATTACHMENT_SIZE,
            color: TOAST_COLORS.DANGER,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
          event.target.files = null;
          return;
        }

        const presignedUrlResponse = await getS3PresignedUrl(fileName, fileType);
        const { data: { uploadUrl, fileUrl } } = presignedUrlResponse;
        await uploadToS3ByPresignedUrl(uploadUrl, file);

        addToast({
          title: PROFILE_MESSAGES.ATTACHMENT_UPLOADED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });

        const newDocument: IDocument = {
          id: fileUrl,
          attachmentUrl: fileUrl,
          attachmentTitle: fileName,
          type: normalizeAttachmentType(fileType),
          size: file.size,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: startup.id,
          ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        };

        if (isImageFile(fileType)) {
          setStartupImages([...startupImages, newDocument]);
          setSelectedImage(newDocument);
        } else {
          setStartupDocuments([...startupDocuments, newDocument]);
        }

        setPendingUploadAttachments([...pendingUploadAttachments, file]);
      } catch (err) {
        addToast({
          title: PROFILE_MESSAGES.ATTACHMENT_UPLOAD_FAILED,
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
      size='5xl'
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior='inside'
      className='px-10 pb-6 min-h-[600px]'
      hideCloseButton={true}
      classNames={{
        header: 'px-0',
        body: 'px-0 custom-scrollbar',
      }}
    >
      <ModalContent>
        {(onOpenChange) => (
          <>
            <ModalHeader>
              <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-3 px-3'>
                  <Avatar
                    alt='heroui logo'
                    src={image}
                    size='md'
                    radius='full'
                    isBordered
                    color='primary'
                    className='bg-neutral-20'
                  />
                  <div className='flex flex-col justify-center'>
                    <p className='font-semibold text-lg text-secondary'>{startup?.name}</p>
                    <p className='text-neutral-50 font-normal text-md'>
                      {UI_LABELS.STARTUP_SETTING}
                    </p>
                  </div>
                </div>
                <div className='cursor-pointer' onClick={onOpenChange}>
                  <CloseIcon stroke='black' />
                </div>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <Tabs
                aria-label='Options'
                variant='light'
                color='primary'
                isVertical={true}
                className='py-2 pr-4 mr-4 border-r-1 border-neutral-40'
              >
                <Tab
                  key='general'
                  title={UI_LABELS.GENERAL}
                  className='w-full flex flex-col gap-2 py-2'
                >
                  <GeneralTab
                    image={image}
                    startupName={startupName}
                    location={location}
                    sdgGoal={sdgGoal}
                    description={description}
                    startup={startup}
                    startupImages={startupImages}
                    startupDocuments={startupDocuments}
                    selectedImage={selectedImage}
                    selectedDocument={selectedDocument}
                    advancedInformation={advancedInformation}
                    onUpdateProfileClick={onUpdateProfileClick}
                    onOpenChange={onOpenChange}
                    handleProfilePictureChange={handleProfilePictureChange}
                    handleUploadNewStartupAttachment={handleUploadNewStartupAttachment}
                    handleSelectImage={handleSelectImage}
                    handleSelectDocument={handleSelectDocument}
                    handleDeleteAttachment={handleDeleteAttachment}
                    setStartupName={setStartupName}
                    setLocation={setLocation}
                    setSdgGoal={setSdgGoal}
                    setDescription={setDescription}
                    setAdvancedInformation={setAdvancedInformation}
                  />
                </Tab>
                <Tab
                  key='advanced'
                  title={UI_LABELS.ADVANCED}
                  className='w-full flex flex-col gap-2 py-3'
                >
                  <AdvancedTab
                    startup={startup}
                    onOpenHideProfileModal={onOpenHideProfileModal}
                    onOpenDeleteProfileModal={onOpenDeleteProfileModal}
                    onOpenChangeHideProfileModal={onOpenChangeHideProfileModal}
                    onOpenChangeDeleteProfileModal={onOpenChangeDeleteProfileModal}
                    handleHideProfileClick={handleHideProfileClick}
                    handleDeleteProfileClick={handleDeleteProfileClick}
                    isHideProfileModalOpen={isHideProfileModalOpen}
                    isDeleteProfileModalOpen={isDeleteProfileModalOpen}
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
