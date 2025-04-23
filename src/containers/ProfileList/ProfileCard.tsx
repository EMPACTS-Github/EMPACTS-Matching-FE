import React from 'react'
import { Startup } from '@/interfaces/startup'
import { Avatar } from "@heroui/react";
import RightArrow from "/public/assets/arrow-right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSDGGoal } from '@/utils/getSDGGoal';

type Props = {
  startup: Startup
}

const ProfileCard = ({ startup }: Props) => {
  const router = useRouter();
  
  const handleNavigateToStartupProfile = () => {
    router.push(`/startup-profile/${startup.id}`);
  }

  return (
    <div
      key={startup.id}
      className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-slate-200 hover:rounded-lg"
      onClick={handleNavigateToStartupProfile}
    >
      <div className="flex items-center">
        <Avatar
          src={startup.avt_url}
          alt={`${startup.name} Avatar`}
          size="lg"
        />
        <div className="ml-4">
          <p className="font-bold text-gray-800">{startup.name}</p>
          <p className="text-sm text-gray-500">{getSDGGoal(startup.category as string)}</p>
        </div>
      </div>
      <Image src={RightArrow} className="text-gray-400 text-lg" alt={""} width={24} height={24} />
    </div>
  )
}

export default ProfileCard