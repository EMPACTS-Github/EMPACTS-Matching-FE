'use client';
import React, { useState, useEffect } from 'react';
import { Tooltip } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';
import CopyIcon from '@/components/Icons/CopyIcon';
import MemberModal from './MeetingAction/MemberModal';
import CancelMeeting from './MeetingAction/CancelMeeting';
import { ConnectionMeeting } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';
import { mentor_profile_detail } from '@/apis/mentor-profile';

interface UpcomingMeetingItemProps {
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

const UpcomingMeetingItem: React.FC<UpcomingMeetingItemProps> = ({
  meeting,
  onCancelSuccess,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [mentorData, setMentorData] = useState<{
    name: string;
    avtUrl?: string;
    locationBased?: string;
  } | null>(meeting.mentor || null);

  useEffect(() => {
    if (!meeting.mentor && meeting.mentorId) {
      mentor_profile_detail(meeting.mentorId)
        .then((response) => {
          if (response?.data?.mentor) {
            setMentorData({
              name: response.data.mentor.name,
              avtUrl: response.data.mentor.avtUrl,
              locationBased: response.data.mentor.locationBased,
            });
          }
        })
        .catch((error) => {
          setMentorData({ name: 'Unknown Mentor' });
        });
    }
  }, [meeting.mentor, meeting.mentorId]);

  // Extract mentor data
  const mentorName = mentorData?.name || 'Unknown Mentor';
  const mentorAvatar = mentorData?.avtUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL;
  const mentorLocation = mentorData?.locationBased ? getProvince(mentorData.locationBased) : '';

  // Format meeting date and time
  const meetingDateTime = formatMeetingDateTime(meeting.startAt, meeting.endAt);

  const handleCopyLink = () => {
    if (meeting.meetLink) {
      const fullLink = meeting.meetLink.startsWith('http')
        ? meeting.meetLink
        : `https://${meeting.meetLink}`;
      navigator.clipboard.writeText(fullLink);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const handleJoinMeeting = () => {
    if (meeting.meetLink) {
      const fullLink = meeting.meetLink.startsWith('http')
        ? meeting.meetLink
        : `https://${meeting.meetLink}`;
      window.open(fullLink, '_blank');
    }
  };

  const handleOpenMemberModal = () => {
    setIsMemberModalOpen(true);
  };

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
  };

  const handleOpenCancelModal = () => {
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
          <Avatar variant='default-lg' src={mentorAvatar} />
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold leading-tight'>{mentorName}</p>
            <p className='text-sm font-normal text-neutral-80'>{mentorLocation}</p>
          </div>
        </div>

        {/* Column 2 Row 1: EMPACTS Connect Meeting Info */}
        <div className='flex flex-col gap-1'>
          <p className='text-xl font-bold leading-tight'>{meeting.title}</p>
          <p className='text-base font-normal leading-relaxed'>{meetingDateTime}</p>
        </div>

        {/* Column 3 Row 1: Join Meeting Action */}
        <div className='flex flex-col gap-1 items-end'>
          <Button variant='primary-lg' onClick={handleJoinMeeting} disabled={!meeting.meetLink}>
            <p className='text-base font-bold leading-6'>Join with Google Meet</p>
          </Button>
          {meeting.meetLink && (
            <div className='flex items-center gap-1'>
              <p className='text-xs font-normal leading-4'>{meeting.meetLink}</p>
              <Tooltip content={isCopied ? 'Copied' : 'Copy Link'}>
                <div className='cursor-pointer' onClick={handleCopyLink}>
                  <CopyIcon />
                </div>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Column 2 Row 2: Representative Info */}
        <div className='flex gap-6'>
          <div className='flex flex-col'>
            <p className='text-xl font-bold leading-tight'>Representative:</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-base font-normal leading-relaxed'>{meeting.primaryContact?.name || 'N/A'}</p>
            <p className='text-base font-normal leading-relaxed'>{meeting.primaryContact?.email || 'N/A'}</p>
          </div>
        </div>

        {/* Column 3 Row 2: Meeting Members & Cancel Button */}
        <div className='flex flex-col gap-2'>
          <Button variant='bordered-lg' onClick={handleOpenMemberModal}>
            <p className='text-base font-bold leading-6'>Meeting Members</p>
          </Button>
          <Button variant='warning-lg' onClick={handleOpenCancelModal}>
            <p className='text-base font-bold leading-6'>Cancel Meeting</p>
          </Button>
        </div>
      </div>

      {/* Member Modal */}
      <MemberModal
        isOpen={isMemberModalOpen}
        onOpenChange={handleCloseMemberModal}
        attendees={meeting.attendees || []}
        startupId={meeting.startupId}
        meetingId={meeting.id}
      />

      {/* Cancel Meeting Modal */}
      <CancelMeeting
        isOpen={isCancelModalOpen}
        onOpenChange={handleCloseCancelModal}
        meetingId={meeting.id}
        mentorName={mentorName}
        onCancelSuccess={onCancelSuccess}
      />
    </div>
  );
};

export default UpcomingMeetingItem;
