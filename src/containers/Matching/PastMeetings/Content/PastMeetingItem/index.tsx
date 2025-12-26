'use client';
import React from 'react';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';
import { ConnectionMeeting } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';
import { MEETING_STATUS } from '@/constants/matching';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { formatMeetingDateTime } from '@/services/matching';

interface PastMeetingItemProps {
  meeting: ConnectionMeeting;
  actor: 'mentor' | 'startup';
}

const PastMeetingItem: React.FC<PastMeetingItemProps> = ({ meeting, actor }) => {
  // Extract person data based on actor
  const personData = actor === 'startup' ? meeting.mentor : meeting.startup;
  const personName = personData?.name || (actor === 'startup' ? 'Unknown Mentor' : 'Unknown Startup');
  const personAvatar = personData?.avtUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
  const personLocation = personData?.locationBased ? getProvince(personData.locationBased) : '';

  // Format meeting date and time (only if both dates exist)
  const meetingDateTime = meeting.startAt && meeting.endAt 
    ? formatMeetingDateTime(meeting.startAt, meeting.endAt) 
    : 'Date not available';

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
        <p className='text-base leading-6 font-bold text-error'>
          {capitalizeFirstLetter(status)}
        </p>
      );
    }
    return (
      <p className='text-base leading-6 font-bold text-neutral-80'>
        {capitalizeFirstLetter(status)}
      </p>
    );
  };

  const renderMeetingDetails = () => {
    if (meeting.status === MEETING_STATUS.EXPIRED) {
      return null;
    }

    return <p className='text-base font-normal leading-6'>{meetingDateTime}</p>;
  };

  return (
    <div className='w-full rounded-md p-4 border border-neutral-50'>
      {/* 3-Column Grid Layout */}
      <div className='grid grid-cols-[280px_1fr_200px] gap-8 items-start'>
        {/* Column 1: Avatar + Name + Status */}
        <div className='flex flex-col gap-3'>
          <div className='flex gap-4 items-start'>
            <Avatar variant='default-lg' src={personAvatar} />
            <div className='flex flex-col gap-1'>
              <p className='text-xl font-bold leading-tight'>{personName}</p>
              <p className='text-sm font-normal text-neutral-80'>{personLocation}</p>
              {renderStatus(meeting.status)}
            </div>
          </div>
        </div>

        {/* Column 2: Meeting Details */}
        <div className='flex flex-col gap-1'>
          <p className='text-xl font-bold leading-tight'>{meeting.title}</p>
          {renderMeetingDetails()}
        </div>

        {/* Column 3: Reconnect Button */}
        <div className='flex justify-end items-start'>
          <Button variant='primary-md' disabled>
            <p className='text-base font-bold leading-6 text-white'>Reconnect</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PastMeetingItem;
