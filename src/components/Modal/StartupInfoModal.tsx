import { Modal, ModalContent, ModalBody, Tab, Tabs, Link, addToast } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import React, { useState, useEffect } from 'react';
import { Startup } from '@/interfaces/StartupProfile';
import { getProvince } from '@/utils/getProvince';
import { getSDGGoal } from '@/utils/getSDGGoal';
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import { IDocument } from '@/interfaces/upload';
import MediaEmptyStateLogo from '/public/assets/media-empty-state-logo.svg';
import { getStartupDocuments } from '@/apis/upload';
import { isImageFile, isDocumentFile } from '@/services/upload';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';

interface StartupInfoModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  startupData: Startup;
}

const StartupInfoModal: React.FC<StartupInfoModalProps> = ({
  isOpen,
  onOpenChange,
  startupData,
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startupImages, setStartupImages] = useState<IDocument[]>([]);

  const fetchStartupDocuments = async () => {
    try {
      const response = await getStartupDocuments({
        ownerId: startupData?.id || '',
        ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        limit: 100,
        page: 1,
      });
      const allDocuments = response.data;
      const images = allDocuments.filter((document: IDocument) => isImageFile(document.type));
      setStartupImages(images);
    } catch (error) {
      addToast({
        title: 'Oops! Something went wrong',
        color: 'danger',
        timeout: 3000,
      });
    }
  };
  useEffect(() => {
    fetchStartupDocuments();
  }, []);

  // Inline ProfileHeader component
  const ProfileHeader = ({ startup }: { startup: Startup | null }) => (
    <div className='mb-small'>
      <div className='flex items-center'>
        <Avatar src={startup?.avtUrl} variant='default-lg' />
        <div className='flex flex-col ml-regular'>
          <h3 className='text-xl font-bold text-secondary'>{startup?.name}</h3>
          <p className='text-neutral-80 text-md'>{getProvince(startup?.locationBased || '')}</p>
        </div>
      </div>
      <div className='flex w-full gap-x-semi-regular mt-regular'>
        <div className='flex items-center gap-1 overflow-hidden'>
          <Image src={LabelIcon} alt='Project' width={24} height={24} className='object-cover' />
          <span className='font-inter font-semibold text-base text-secondary text-center truncate'>
            {getSDGGoal(startup?.sdgGoal || '')}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Image src={GroupIcon} alt='Members' width={24} height={24} className='object-cover' />
          <span className='font-inter font-semibold text-base text-secondary text-center'>
            {startup?.memberQty} {startup?.memberQty === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>
    </div>
  );

  // Inline OverviewBody component
  const OverviewBody = ({ startup }: { startup: Startup }) => (
    <div className='space-y-regular'>
      <div>
        <h4 className='text-lg font-semibold text-secondary'>Description</h4>
        <p className='text-neutral-80 text-sm whitespace-pre-line'>
          {startup.description || 'No description available'}
        </p>
      </div>
      <div>
        <h4 className='text-lg font-semibold text-secondary w-1/2'>Profile Link</h4>
        <p className='text-neutral-80 text-sm whitespace-pre-line w-1/2'>
          {startup.startupLink ? (
            <Link
              isExternal
              showAnchorIcon
              size='sm'
              className='text-primary'
              href={
                startup.startupLink.startsWith('http')
                  ? startup.startupLink
                  : `https://${startup.startupLink}`
              }
            >
              {startup.startupLink}
            </Link>
          ) : (
            <span className='text-neutral-80'>No profile link available</span>
          )}
        </p>
      </div>
    </div>
  );

  // Inline ImageGallery component
  const ImageGallery = ({ images }: { images: IDocument[] }) => (
    <div className='flex flex-col w-full my-regular'>
      {images.length > 0 ? (
        <div>
          <div className='w-full h-auto mb-regular'>
            <Image
              src={images[selectedImageIndex].attachmentUrl}
              alt='Selected'
              width={800}
              height={400}
              className='object-cover shadow-lg rounded-lg'
            />
          </div>

          <div className='flex space-x-small'>
            {images.map((image, index) => (
              <div key={index} onClick={() => setSelectedImageIndex(index)}>
                <Image
                  src={image.attachmentUrl}
                  alt={`Thumbnail ${index}`}
                  width={56}
                  height={56}
                  className={`w-14 h-14 object-cover cursor-pointer box-border p-1 border-solid border-2 ${
                    selectedImageIndex == index ? 'border-primary' : 'border-transparent'
                  } rounded-lg`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mt-regular'>
          <Image src={MediaEmptyStateLogo} alt='Media Empty State Logo' className='w-40 h-auto' />
          <div className='flex flex-col items-center justify-center mb-regular'>
            <p className='text-md text-neutral-80 mb-small'>No Result</p>
            <p className='text-sm text-neutral-50'>
              This is a mistake? Please refresh your page to see updates
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const TabsSection = ({ startup, media }: { startup: Startup; media: IDocument[] }) => (
    <div className='flex-1'>
      <Tabs aria-label='Startup Tabs' variant='underlined' color='primary' className='font-bold'>
        <Tab key='overview' title='Overview'>
          <OverviewBody startup={startup} />
        </Tab>
        <Tab key='media' title='Media'>
          <div className='flex items-center'>
            <ImageGallery images={media} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );

  return (
    <Modal
      isKeyboardDismissDisabled={true}
      size='xl'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className='min-h-[65vh]'
    >
      <ModalContent className='py-4'>
        {(onOpenChange) => (
          <ModalBody className='flex flex-col gap-2'>
            <div>
              <ProfileHeader startup={startupData} />
              <TabsSection startup={startupData} media={startupImages} />
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default StartupInfoModal;
