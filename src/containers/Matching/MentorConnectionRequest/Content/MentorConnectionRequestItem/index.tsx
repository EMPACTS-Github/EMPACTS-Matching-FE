import React from 'react';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';

interface ConnectionRequestData {
  id: string;
  startupName: string;
  startupLocation: string;
  startupAvatar?: string;
  meetingStatus: string;
}

interface MentorConnectionRequestItemProps {
  request: ConnectionRequestData;
}

const MentorConnectionRequestItem: React.FC<MentorConnectionRequestItemProps> = ({ request }) => {
  return (
    <div className='w-full rounded-md p-4 border border-neutral-50'>
      <div className='flex justify-between items-center'>
        {/* Column 1: Avatar + Name (spans 2 rows) */}
        <div className='row-span-2 flex gap-4'>
          <Avatar
            variant='default-lg'
            src={request.startupAvatar || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
            alt={`${request.startupName}'s avatar`}
          />
          <div className='flex flex-col gap-1 justify-center'>
            <p className='text-xl font-bold leading-tight'>{request.startupName}</p>
            <p className='text-sm font-normal text-neutral-80'>{request.startupLocation}</p>
          </div>
        </div>

        {/* Column 3 Row 1: Join Meeting Action */}
        {request.meetingStatus === 'Pending' ? (
          <div className='flex gap-3 items-center'>
            <Button variant='primary-lg' onClick={() => {}}>
              Accept
            </Button>
            <Button variant='bordered-lg' onClick={() => {}}>
              Decline
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MentorConnectionRequestItem;
