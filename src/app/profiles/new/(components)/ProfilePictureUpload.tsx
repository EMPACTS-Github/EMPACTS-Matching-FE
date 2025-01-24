import React, { useState } from 'react';
import Image from 'next/image';

interface ProfilePictureUploadProps {
  onImageUpload?: (file: File) => void;
  defaultImage?: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onImageUpload,
  defaultImage = 'https://dashboard.codeparrot.ai/api/assets/Z4oNjBgaGNOSvOZP'
}) => {
  const [image, setImage] = useState<string>(defaultImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload?.(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full py-4">
      <div className="relative">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
          <Image 
            src={image} 
            alt="Profile" 
            layout="fill"
            objectFit="cover"
          />
        </div>
        <label className="cursor-pointer flex items-center justify-center w-[40px] h-[40px] bg-white rounded-full absolute bottom-0 right-0">
          <Image 
            src="https://dashboard.codeparrot.ai/api/assets/Z4oNjBgaGNOSvOZQ" 
            alt="Upload" 
            width={24}
            height={24}
          />
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <p className="text-[#313957] text-lg leading-[160%] tracking-[0.18px] text-center">
        Upload a startup profile picture
      </p>
    </div>
  );
};

export default ProfilePictureUpload;

