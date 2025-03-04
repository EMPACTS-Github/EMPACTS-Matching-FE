import UserAvatarPlaceholder from '../../../public/user-avatar-placeholder.svg';
import { Input, Avatar } from "@heroui/react";
import Image from 'next/image';
import React, { useRef } from "react";

type UserAvatarProps = {
  avatarUrl?: string,
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function UserAvatar({ avatarUrl, handleAvatarChange }: UserAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        {
          avatarUrl ? (<Avatar
            src={avatarUrl}
            alt="User avatar"
            className="w-[100px] h-[100px]"
          />) : (
            <Image
              src={UserAvatarPlaceholder}
              alt="User avatar placeholder"
              width={100}
              height={100}
            />
          )
        }
      </div>
      
      <Input
        ref={fileInputRef}
        type="file"
        onChange={handleAvatarChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        aria-label="Upload avatar"
      />
    </div>
  )
}

export default UserAvatar