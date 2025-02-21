import React, { useState } from "react";
import Image from "next/image";
import UploadAvatar from "public/assets/upload_avatar.svg";
import { upload_image } from "@/apis/upload"; // Import the upload_image API

interface ProfilePictureUploadProps {
  onImageUpload?: (fileUrl: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onImageUpload,
}) => {
  const [image, setImage] = useState<string>(UploadAvatar);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await upload_image(file);
        setImage(response.fileUrl);
        console.log("Uploaded image:", response.fileUrl);
        setError(null);
        onImageUpload?.(response.fileUrl); 
      } catch (err) {
        setError("Failed to upload the image. Please try again.");
      }
    } else {
      setError("No file selected. Please choose an image file.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full py-4">
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
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
