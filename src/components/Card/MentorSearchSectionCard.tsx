import React from 'react';
import Image from 'next/image';
import { Mentor } from '@/interfaces/MentorProfile';
import TextLine from '@/components/common/TextLine';
import { getProvince } from '@/utils/getProvince';
import { Avatar } from '@heroui/react';

interface MentorSearchSectionCardProps extends Mentor {
  onClick: (id: string) => void;
}

const MentorSearchSectionCard: React.FC<MentorSearchSectionCardProps> = ({
  id,
  avtUrl,
  name,
  description,
  locationBased,
  onClick,
}) => {
  return (
    <div
      className='p-5 bg-white rounded-lg flex flex-col items-start gap-5 shadow-md cursor-pointer'
      onClick={() => onClick(id)}
    >
      <div className='flex flex-row rounded-md py-2 items-center'>
        <Avatar
          src={avtUrl}
          alt={`${name}'s avatar`}
          color='primary'
          isBordered
          size='lg'
          radius='full'
          className='bg-white'
        />
        <div className='flex flex-col justify-start ml-4'>
          <div className='text-lg font-semibold text-black'>{name}</div>
          <TextLine
            text={getProvince(locationBased || '')}
            className='text-gray-600 text-sm text-left line-clamp-1'
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 justify-start mt-1'>
        <div className='font-semibold'>Description:</div>
        <div className='font-normal text-gray-700 line-clamp-5'>{description}</div>
      </div>
    </div>
  );
};

export default MentorSearchSectionCard;
