"use client"
import React from "react";
import RightArrow from "/public/assets/arrow-right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileOptionProps {
  title: string;
  description: string;
  link: string;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ title, description, link }) => {
  const router = useRouter();

  const handleChooseOption = () => {
    router.push(link)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b cursor-pointer" onClick={handleChooseOption}>
      <div className="flex items-center">
        <div className="ml-4">
          <p className="font-bold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Image src={RightArrow} className="text-gray-400 text-lg" alt={""} width={24} height={24} />
    </div>
  );
};

export default ProfileOption;
