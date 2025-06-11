import React, { useState } from "react";
import Image from "next/image";
import UploadAvatar from "/public/assets/upload_avatar.svg";
import { uploadAttachemt } from "@/apis/upload";
import { addToast } from "@heroui/react";
import { UPLOAD_OWNER_TYPE } from "@/constants/upload";

interface ProfilePictureUploadProps {
  onImageUpload: (fileUrl: string, fileId: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onImageUpload,
}) => {
  const [image, setImage] = useState<string>(UploadAvatar);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const response = await uploadAttachemt({ file, ownerType: UPLOAD_OWNER_TYPE.STARTUP });
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
    <div className="flex flex-col items-center gap-5 w-full py-4 relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
      <label htmlFor="profile-upload" className="relative cursor-pointer">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-300">
          <Image
            src={image}
            alt="Profile"
            width={1000}
            height={1000}
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      <p className="text-[#313957] text-lg leading-[160%] tracking-[0.18px] text-center">
        Upload a startup profile picture
      </p>
    </div>
  );
};

export default ProfilePictureUpload;
