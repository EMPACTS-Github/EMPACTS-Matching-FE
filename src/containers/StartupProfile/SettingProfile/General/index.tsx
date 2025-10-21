import React from 'react';
import ImageGallery from '@/containers/StartupProfile/SettingProfile/General/ImageGallery';
import DocumentBody from '@/containers/StartupProfile/SettingProfile/General/DocumentBody';
import BasicInformation from '@/containers/StartupProfile/SettingProfile/General/BasicInformation';
import AdvancedInformation from '@/containers/StartupProfile/SettingProfile/General/AdvancedInformation';
import ActionButton from '@/containers/StartupProfile/SettingProfile/General/ActionButton';
import { Startup } from '@/interfaces/StartupProfile';
import { IDocument } from '@/interfaces/upload';

interface GeneralTabProps {
  image: string;
  startup: Startup;
  startupName: string;
  location: string;
  sdgGoal: string;
  description: string;
  startupImages: IDocument[];
  startupDocuments: IDocument[];
  selectedImage: IDocument | null;
  selectedDocument: IDocument | null;
  onUpdateProfileClick: () => void;
  onOpenChange: () => void;
  handleProfilePictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadNewStartupAttachment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectImage: (image: IDocument) => void;
  handleSelectDocument: (document: IDocument) => void;
  handleDeleteAttachment: (attachment: IDocument | null) => void;
  setStartupName: (name: string) => void;
  setLocation: (location: string) => void;
  setSdgGoal: (sdgGoal: string) => void;
  setDescription: (description: string) => void;
}

const GeneralTab = ({
  image,
  startup,
  startupName,
  location,
  sdgGoal,
  description,
  startupImages,
  startupDocuments,
  selectedImage,
  selectedDocument,
  onUpdateProfileClick,
  onOpenChange,
  handleProfilePictureChange,
  handleUploadNewStartupAttachment,
  handleSelectImage,
  handleSelectDocument,
  handleDeleteAttachment,
  setStartupName,
  setLocation,
  setSdgGoal,
  setDescription,
}: GeneralTabProps) => {
  return (
    <>
      <BasicInformation
        image={image}
        startupName={startupName}
        location={location}
        sdgGoal={sdgGoal}
        description={description}
        handleProfilePictureChange={handleProfilePictureChange}
        setStartupName={setStartupName}
        setLocation={setLocation}
        setSdgGoal={setSdgGoal}
        setDescription={setDescription}
      />

      <ImageGallery
        images={startupImages}
        selectedImage={selectedImage}
        onUploadNewImage={handleUploadNewStartupAttachment}
        onSelectImage={handleSelectImage}
        onDeleteAttachment={handleDeleteAttachment}
      />

      <DocumentBody
        files={startupDocuments}
        selectedFile={selectedDocument}
        onSelectFile={handleSelectDocument}
        onDeleteAttachment={handleDeleteAttachment}
        onUploadNewFile={handleUploadNewStartupAttachment}
      />

      <AdvancedInformation startup={startup} />

      <ActionButton onOpenChange={onOpenChange} onUpdateProfileClick={onUpdateProfileClick} />
    </>
  );
};

export default GeneralTab;
