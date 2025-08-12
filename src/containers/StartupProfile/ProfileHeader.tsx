import { Avatar } from '@heroui/react';
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import { getProvince } from '@/utils/getProvince';
import { getSDGGoal } from '@/utils/getSDGGoal';
import { Startup } from '@/interfaces/StartupProfile';

interface ProfileHeaderProps {
  startup: Startup | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ startup }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center">
        <Avatar
          showFallback
          isBordered
          src={startup?.avtUrl}
          size="lg"
          radius="full"
          className="bg-white"
          color="primary"
        />
        <div className="flex flex-col ml-4">
          <h3 className="text-xl font-bold text-gray-800">{startup?.name}</h3>
          <p className="text-gray-500 text-md">{getProvince(startup?.locationBased || '')}</p>
        </div>
      </div>
      <div className="flex w-full gap-x-3 mt-4">
        <div className="flex items-center gap-1 overflow-hidden">
          <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-black text-center truncate">
            {getSDGGoal(startup?.sdgGoal || '')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Image src={GroupIcon} alt="Members" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-black text-center">
            {startup?.memberQty} {startup?.memberQty === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
