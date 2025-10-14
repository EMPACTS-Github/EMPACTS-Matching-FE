import React from 'react';
import { Avatar } from '@heroui/react';
import { ConnectionMeeting } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';

interface AttendeeInfoProps {
  meeting: ConnectionMeeting;
}

const AttendeeInfo: React.FC<AttendeeInfoProps> = ({ meeting }) => {
  const mentorName = meeting.mentor?.name || 'Unknown Mentor';
  const mentorAvatar = meeting.mentor?.avtUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
  const mentorLocation = meeting.mentor?.locationBased
    ? getProvince(meeting.mentor.locationBased)
    : '';

  return (
    <div className='max-w-[300px] flex gap-3'>
      <Avatar src={mentorAvatar} className='w-[64px] h-[64px]' radius='full' />
      <div className='flex flex-col px-3'>
        <p className='text-xl font-bold leading-8'>{mentorName}</p>
        <p className='text-sm leading-5 font-normal text-neutral-80'>{mentorLocation}</p>
      </div>
    </div>
  );
};

export default AttendeeInfo;
