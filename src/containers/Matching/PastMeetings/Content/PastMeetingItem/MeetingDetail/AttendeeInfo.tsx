import React from 'react';
import { Avatar } from '@heroui/react';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { MEETING_STATUS } from '@/constants/matching';

interface AttendeeInfoProps {
  status: string;
}

const AttendeeInfo = ({ status }: AttendeeInfoProps) => {
  const renderStatus = (status: string) => {
    if (status === MEETING_STATUS.COMPLETED) {
      return (
        <p className='text-base leading-6 font-bold text-success'>
          {capitalizeFirstLetter(status)}
        </p>
      );
    }
    if (status === MEETING_STATUS.CANCELLED) {
      return (
        <p className='text-base leading-6 font-bold text-error'>{capitalizeFirstLetter(status)}</p>
      );
    }
    return (
      <p className='text-base leading-6 font-bold text-neutral-80'>
        {capitalizeFirstLetter(status)}
      </p>
    );
  };

  return (
    <div className='max-w-[300px] min-w-[230px]'>
      <div className='flex gap-3'>
        <Avatar
          src={process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
          className='w-[64px] h-[64px]'
          radius='full'
        />
        <div className='flex flex-col'>
          <p className='text-xl font-bold leading-8 text-wrap break-words'>John Doe</p>
          <p className='text-sm leading-5 font-normal text-neutral-80 text-wrap break-words'>
            Hanoi, Vietnam
          </p>
        </div>
      </div>
      <div className='pl-[76px]'>{renderStatus(status)}</div>
    </div>
  );
};

export default AttendeeInfo;
