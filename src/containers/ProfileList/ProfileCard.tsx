import React from 'react'
import { Startup } from '@/interfaces/startup'
import { Avatar } from "@heroui/react";
import RightArrow from "/public/assets/arrow-right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSDGGoal } from '@/utils/getSDGGoal';
import { Mentor } from '@/interfaces/mentor';

interface ProfileCardProps {
  profile: Startup | Mentor,
  type: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, type }) => {
  const router = useRouter();

  const handleNavigateToProfile = () => {
    if (type === "startup") {
      // profile là Startup
      router.push(`/startup-detail/${profile.id}`);
    } else {
      // profile là Mentor
      router.push(`/mentor-detail/${profile.id}`);
    }
  }

  return (
    <div
      key={profile.id}
      className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-slate-200 hover:rounded-lg"
      onClick={handleNavigateToProfile}
    >
      <div className="flex items-center">
        <Avatar
          src={profile.avtUrl}
          alt={`${profile.name} Avatar`}
          size="lg"
        />
        <div className="ml-4">
          <p className="font-bold text-gray-800">{profile.name}</p>
          <p className="text-sm text-gray-500">{getSDGGoal(profile.sdgGoal as string)}</p>
        </div>
      </div>
      <Image src={RightArrow} className="text-gray-400 text-lg" alt={""} width={24} height={24} />
    </div>
  )
}

export default ProfileCard