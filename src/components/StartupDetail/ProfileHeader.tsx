import { Avatar } from "@heroui/react";
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import { Startup } from "@/interfaces/startup";

interface ProfileHeaderProps {
  startup: Startup;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ startup }) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex gap-3 items-center">
        <Avatar isBordered color="primary" className="w-[60px] h-[60px] bg-white" radius="md" src={startup.avtUrl} />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{startup?.name}</h1>
          <p className="text-gray-600">
            {startup?.locationBased || "Location not specified"}
          </p>
        </div>
      </div>
      <div className="flex gap-7">
        <div className="flex items-center gap-1 overflow-hidden">
          <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-black text-center truncate">
            {startup?.sdgGoal}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Image src={GroupIcon} alt="Members" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-black text-center">
            {startup.memberQty} Members
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
