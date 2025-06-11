import React from 'react';
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import { HomepageStartup } from '@/interfaces/startup';

interface StartupCardProps extends HomepageStartup {
  onClick: (id: string) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({
  id,
  avtUrl,
  name,
  description,
  memberQty,
  sdgGoal,
  onClick,
}) => {
  return (
    <div className="w-[300px] h-[365px] p-5 bg-white rounded-lg flex flex-col items-center gap-5 shadow-md cursor-pointer" onClick={() => onClick(id)}>
      <Image src={avtUrl} alt="Startup Logo" width={120} height={120} className="object-cover" />
      <h2 className="font-inter font-semibold text-lg text-gray-900 text-center">{name}</h2>
      <div className="font-inter text-sm font-normal text-gray-500 text-ellipsis line-clamp-4">
        {description}
      </div>
      <div className="flex justify-between w-full gap-x-3 h-11">
        <div className="flex items-center w-1/2 gap-1 overflow-hidden">
          <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-black text-center truncate">
            {sdgGoal}
          </span>
        </div>
        <div className="flex items-center w-1/2 gap-1">
          <Image src={GroupIcon} alt="Members" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-black text-center">
            {memberQty} Members
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
