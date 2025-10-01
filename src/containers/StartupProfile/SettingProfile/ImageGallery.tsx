import { useRef, useState } from 'react';
import Image from 'next/image';
import ImagePlusIcon from '/public/assets/image-plus.svg';
import { IDocument } from '@/interfaces/upload';
import { Button, useDisclosure } from '@heroui/react';
import CloseIcon from '@/components/Icons/CloseIcon';
import DeleteImageModal from '@/components/Modal/DeleteImageModal';

interface ImageGalleryProps {
  images: IDocument[];
  selectedImage: IDocument | null;
  onUploadNewImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectImage: (image: IDocument) => void;
  onDeleteAttachment: (attachment: IDocument | null) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  selectedImage,
  onUploadNewImage,
  onSelectImage,
  onDeleteAttachment,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    images.findIndex((image) => image.id === selectedImage?.id) || 0
  );
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [displayDeleteIcon, setDisplayDeleteIcon] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDisplayDeleteIcon = () => {
    setDisplayDeleteIcon(true);
  };

  const handleHideDeleteIcon = () => {
    setDisplayDeleteIcon(false);
  };

  const handleClickAddImage = () => {
    imageInputRef.current?.click();
  };

  return (
    <>
      <div className='flex flex-col w-full my-4'>
        <div>
          {images.length > 0 && (
            <div
              onMouseEnter={handleDisplayDeleteIcon}
              onMouseLeave={handleHideDeleteIcon}
              className='w-full h-auto mb-4 relative'
            >
              <Image
                src={selectedImage?.attachmentUrl || ''}
                alt='Selected'
                width={800}
                height={400}
                className='object-cover shadow-lg rounded-lg'
              />
              {displayDeleteIcon && (
                <Button
                  className='absolute top-2 right-2 rounded-full bg-black/50'
                  size='sm'
                  isIconOnly
                  onPress={() => onOpen()}
                >
                  <CloseIcon />
                </Button>
              )}
            </div>
          )}

          <div className='flex space-x-2 justify-center'>
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  onSelectImage(image);
                }}
              >
                <Image
                  src={image.attachmentUrl}
                  alt={`Thumbnail ${index}`}
                  width={56}
                  height={56}
                  className={`w-14 h-14 object-cover cursor-pointer box-border p-1 border-solid border-2 ${
                    selectedIndex == index ? 'border-empacts' : 'border-transparent'
                  } rounded-lg`}
                />
              </div>
            ))}
            <div
              key='add-new-media'
              className='flex items-center justify-center w-14 h-14 cursor-pointer box-border p-1 border-[3px] border-dashed border-black'
              onClick={handleClickAddImage}
            >
              <Image
                src={ImagePlusIcon}
                alt='Add new media'
                width={36}
                height={36}
                className='cursor-pointer m-auto'
              />
              <input
                ref={imageInputRef}
                id='image-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={onUploadNewImage}
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteImageModal
        image={selectedImage}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onDeleteAttachment={onDeleteAttachment}
      />
    </>
  );
};

export default ImageGallery;
