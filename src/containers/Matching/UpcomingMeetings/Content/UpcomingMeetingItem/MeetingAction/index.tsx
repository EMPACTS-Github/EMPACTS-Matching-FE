'use client';
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import MemberModal from './MemberModal';
import CancelMeeting from './CancelMeeting';
import { ConnectionMeeting, ConnectionMeetingAttendee } from '@/interfaces/matching';

interface MeetingActionProps {
  meeting: ConnectionMeeting;
  onCancelSuccess?: () => void;
  onAttendeesUpdated?: (attendees: ConnectionMeetingAttendee[]) => void;
}

const MeetingAction: React.FC<MeetingActionProps> = ({
  meeting,
  onCancelSuccess,
  onAttendeesUpdated,
}) => {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isCancelMeetingModalOpen, setIsCancelMeetingModalOpen] = useState(false);

  const handleOpenMemberModal = () => {
    setIsMemberModalOpen(true);
  };

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
  };

  const handleOpenCancelMeetingModal = () => {
    setIsCancelMeetingModalOpen(true);
  };

  const handleCloseCancelMeetingModal = () => {
    setIsCancelMeetingModalOpen(false);
  };

  const mentorName = meeting.mentor?.name || 'Unknown Mentor';

  return (
    <div className='flex justify-between'>
      <div className='w-full flex justify-center'>
        <Button
          variant='solid'
          className='bg-black text-white'
          size='lg'
          radius='lg'
          onPress={handleOpenMemberModal}
        >
          <p className='text-base font-bold leading-6'>Meeting Members</p>
        </Button>
      </div>
      <div className='flex justify-center'>
        <Button
          variant='solid'
          className='bg-error text-white'
          size='lg'
          radius='lg'
          onPress={handleOpenCancelMeetingModal}
        >
          <p className='text-base font-bold leading-6'>Cancel Meeting</p>
        </Button>
      </div>
      <MemberModal
        isOpen={isMemberModalOpen}
        onOpenChange={handleCloseMemberModal}
        attendees={meeting.attendees || []}
        startupId={meeting.startupId}
        meetingId={meeting.id}
        onAttendeesUpdated={onAttendeesUpdated}
      />
      <CancelMeeting
        isOpen={isCancelMeetingModalOpen}
        onOpenChange={handleCloseCancelMeetingModal}
        meetingId={meeting.id}
        mentorName={mentorName}
        onCancelSuccess={onCancelSuccess}
      />
    </div>
  );
};

export default MeetingAction;
