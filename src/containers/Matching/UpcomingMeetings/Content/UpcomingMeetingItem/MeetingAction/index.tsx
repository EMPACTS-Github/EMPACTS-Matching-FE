'use client';
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import MemberModal from './MemberModal';
import CancelMeeting from './CancelMeeting';

const MeetingAction = () => {
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
      <MemberModal isOpen={isMemberModalOpen} onOpenChange={handleCloseMemberModal} />
      <CancelMeeting
        isOpen={isCancelMeetingModalOpen}
        onOpenChange={handleCloseCancelMeetingModal}
      />
    </div>
  );
};

export default MeetingAction;
