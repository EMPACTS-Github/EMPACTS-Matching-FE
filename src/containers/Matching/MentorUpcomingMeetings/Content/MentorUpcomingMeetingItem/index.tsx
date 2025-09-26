import React, { useState } from 'react';
import { Avatar, Tooltip, Button } from '@heroui/react';
import CopyIcon from '@/components/Icons/CopyIcon';
import MentorCancelMeeting from './MentorCancelMeeting';

interface MeetingData {
  id: string;
  startupName: string;
  startupLocation: string;
  startupAvatar?: string;
  meetingTitle: string;
  meetingDateTime: string;
  googleMeetLink: string;
  representative: {
    name: string;
    email: string;
  };
}

interface MentorUpcomingMeetingItemProps {
  meeting: MeetingData;
}

const MentorUpcomingMeetingItem: React.FC<MentorUpcomingMeetingItemProps> = ({ meeting }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${meeting.googleMeetLink}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleJoinMeeting = () => {
    window.open(`https://${meeting.googleMeetLink}`, '_blank');
  };

  const handleCancelMeeting = () => {
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <div className='w-full rounded-md p-4 border border-neutral-50'>
      {/* 3-Column Grid Layout with Fixed Column Sizes */}
      <div className='grid grid-cols-[280px_1fr_240px] gap-8 items-start'>
        {/* Column 1: Avatar + Name (spans 2 rows) */}
        <div className='row-span-2 flex gap-3'>
          <Avatar
            src={meeting.startupAvatar || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
            className='w-16 h-16 flex-shrink-0'
            radius='full'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-xl font-bold leading-tight'>{meeting.startupName}</p>
            <p className='text-sm font-normal text-neutral-80'>{meeting.startupLocation}</p>
          </div>
        </div>

        {/* Column 2 Row 1: EMPACTS Connect Meeting Info */}
        <div className='flex flex-col gap-1'>
          <p className='text-xl font-bold leading-tight'>{meeting.meetingTitle}</p>
          <p className='text-base font-normal leading-relaxed'>{meeting.meetingDateTime}</p>
        </div>

        {/* Column 3 Row 1: Join Meeting Action */}
        <div className='flex flex-col gap-1 items-end'>
          <Button variant='solid' color='primary' size='lg' onPress={handleJoinMeeting}>
            <p className='text-base font-bold leading-6'>Join with Google Meet</p>
          </Button>
          <div className='flex items-center gap-1'>
            <p className='text-xs font-normal leading-4'>{meeting.googleMeetLink}</p>
            <Tooltip content={isCopied ? 'Copied' : 'Copy Link'}>
              <div className='cursor-pointer' onClick={handleCopyLink}>
                <CopyIcon />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Column 2 Row 2: Representative Info */}
        <div className='flex gap-6'>
          <div className='flex flex-col'>
            <p className='text-xl font-bold leading-tight'>Representative:</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-base font-normal leading-relaxed'>{meeting.representative.name}</p>
            <p className='text-base font-normal leading-relaxed'>{meeting.representative.email}</p>
          </div>
        </div>

        {/* Column 3 Row 2: Cancel Button */}
        <div className='flex justify-end'>
          <Button
            variant='solid'
            color='danger'
            size='lg'
            radius='lg'
            onPress={handleCancelMeeting}
          >
            <p className='text-base font-bold leading-6'>Cancel Meeting</p>
          </Button>
        </div>
      </div>

      {/* Cancel Meeting Modal */}
      <MentorCancelMeeting
        isOpen={isCancelModalOpen}
        onOpenChange={handleCloseCancelModal}
        startupName={meeting.startupName}
        representativeName={meeting.representative.name}
      />
    </div>
  );
};

export default MentorUpcomingMeetingItem;
