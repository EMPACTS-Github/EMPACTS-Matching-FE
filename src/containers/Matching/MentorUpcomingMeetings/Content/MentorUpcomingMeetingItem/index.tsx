import React, { useState } from 'react';
import { Tooltip } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';
import CopyIcon from '@/components/Icons/CopyIcon';
import MentorCancelMeeting from './MentorCancelMeeting';
import { ConnectionMeeting } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';

interface MentorUpcomingMeetingItemProps {
  meeting: ConnectionMeeting;
  onCancelSuccess?: () => void;
}

// Helper function to format date with ordinal
const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// Format date range from start_at and end_at
const formatMeetingDateTime = (startAt: string, endAt: string) => {
  const start = new Date(startAt);
  const end = new Date(endAt);

  const weekday = start.toLocaleDateString('en-US', { weekday: 'long' });
  const month = start.toLocaleDateString('en-US', { month: 'long' });
  const day = getOrdinal(start.getDate());
  const year = start.getFullYear();

  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${weekday}, ${month} ${day}, ${year} at ${startTime} - ${endTime}`;
};

const MentorUpcomingMeetingItem: React.FC<MentorUpcomingMeetingItemProps> = ({
  meeting,
  onCancelSuccess,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Extract startup data
  const startupName = meeting.startup?.name || 'Unknown Startup';
  const startupAvatar = meeting.startup?.avtUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
  const startupLocation = meeting.startup?.locationBased
    ? getProvince(meeting.startup.locationBased)
    : '';

  // Format meeting date and time
  const meetingDateTime = formatMeetingDateTime(meeting.start_at, meeting.end_at);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${meeting.meet_link}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleJoinMeeting = () => {
    window.open(`https://${meeting.meet_link}`, '_blank');
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
        <div className='row-span-2 flex gap-4'>
          <Avatar variant='default-lg' src={startupAvatar} />
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold leading-tight'>{startupName}</p>
            <p className='text-sm font-normal text-neutral-80'>{startupLocation}</p>
          </div>
        </div>

        {/* Column 2 Row 1: EMPACTS Connect Meeting Info */}
        <div className='flex flex-col gap-1'>
          <p className='text-xl font-bold leading-tight'>{meeting.title}</p>
          <p className='text-base font-normal leading-relaxed'>{meetingDateTime}</p>
        </div>

        {/* Column 3 Row 1: Join Meeting Action */}
        <div className='flex flex-col gap-1 items-end'>
          <Button variant='primary-lg' onClick={handleJoinMeeting}>
            <p className='text-base font-bold leading-6'>Join with Google Meet</p>
          </Button>
          <div className='flex items-center gap-1'>
            <p className='text-xs font-normal leading-4'>{meeting.meet_link}</p>
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
            <p className='text-base font-normal leading-relaxed'>
              {meeting.primary_contact.name}
            </p>
            <p className='text-base font-normal leading-relaxed'>
              {meeting.primary_contact.email}
            </p>
          </div>
        </div>

        {/* Column 3 Row 2: Cancel Button */}
        <div className='flex justify-end'>
          <Button variant='warning-lg' onClick={handleCancelMeeting}>
            <p className='text-base font-bold leading-6'>Cancel Meeting</p>
          </Button>
        </div>
      </div>

      {/* Cancel Meeting Modal */}
      <MentorCancelMeeting
        isOpen={isCancelModalOpen}
        onOpenChange={handleCloseCancelModal}
        startupName={startupName}
        representativeName={meeting.primary_contact.name}
        meetingId={meeting.id}
        onCancelSuccess={onCancelSuccess}
      />
    </div>
  );
};

export default MentorUpcomingMeetingItem;
