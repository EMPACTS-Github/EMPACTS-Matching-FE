'use client';
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import MemberModal from './MemberModal';

const MeetingAction = () => {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const handleOpenMemberModal = () => {
    setIsMemberModalOpen(true);
  }

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
  }

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
          onPress={() => {}}
        >
          <p className='text-base font-bold leading-6'>Cancel Meeting</p>
        </Button>
      </div>
      <MemberModal isOpen={isMemberModalOpen} onOpenChange={handleCloseMemberModal} />
    </div>
  );
};

export default MeetingAction;
