import React from 'react'
import Image from 'next/image';
import CameraIcon from '@/components/Icons/CameraIcon';

interface ProfilePictureUploadProps {
  profilePictureUrl: string | undefined;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePictureUpload = ({ profilePictureUrl, handleFileChange }: ProfilePictureUploadProps) => {
  return (
    <div className='flex flex-col items-center gap-5'>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
        id='profile-picture'
      />
      <label htmlFor='profile-picture' className='cursor-pointer flex justify-center'>
        <div className='w-[12%] h-[12%] relative min-w-20 min-h-20 rounded-full bg-neutral-40 flex items-center justify-center overflow-hidden hover:bg-neutral-50 transition-colors'>
          {profilePictureUrl ? (
            <Image
              src={profilePictureUrl}
              alt='Profile'
              className='w-full h-full object-cover'
              fill
            />
          ) : (
            <CameraIcon />
          )}
        </div>
      </label>
      <p className='text-regular font-bold text-secondary leading-[150%] text-center'>
        Upload your profile picture
      </p>
    </div>
  )
};

export default ProfilePictureUpload;
