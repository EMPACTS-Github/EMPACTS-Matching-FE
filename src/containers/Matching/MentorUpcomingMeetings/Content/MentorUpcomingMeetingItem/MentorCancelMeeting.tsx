'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody } from '@heroui/react';
import Button from '@/components/Button/Button';

interface MentorCancelMeetingProps {
  isOpen: boolean;
  onOpenChange: () => void;
  startupName: string;
  representativeName: string;
}

const MentorCancelMeeting: React.FC<MentorCancelMeetingProps> = ({
  isOpen,
  onOpenChange,
  startupName,
  representativeName,
}) => {
  const [cancelReason, setCancelReason] = useState('');

  const handleChangeCancelReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCancelReason(e.target.value);
  };

  const handleCancelMeeting = () => {
    // Handle actual cancel meeting logic here
    console.log('Meeting cancelled with reason:', cancelReason);
    console.log('Startup:', startupName, 'Representative:', representativeName);
    setCancelReason(''); // Reset form
    onOpenChange(); // Close modal
  };

  const handleBack = () => {
    setCancelReason(''); // Reset form
    onOpenChange(); // Close modal
  };

  return (
    <Modal
      size='2xl'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        body: 'p-8',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <div className='flex flex-col gap-8'>
              <p className='text-[28px] font-bold leading-[48px]'>
                Cancel meeting with <span className='text-primary'>{startupName}</span>
              </p>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold leading-8'>Cancel reason</p>
                <textarea
                  value={cancelReason}
                  onChange={handleChangeCancelReason}
                  rows={5}
                  placeholder='Please provide a reason for cancelling this meeting...'
                  className='border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-20 text-secondary resize-none focus:outline-none focus:border-secondary transition-colors'
                />
              </div>
              <div className='flex gap-4'>
                <Button variant='secondary-lg' onClick={handleBack} fullWidth>
                  <p className='text-base font-bold leading-6 text-primary'>Back</p>
                </Button>
                <Button variant='primary-lg' onClick={handleCancelMeeting} fullWidth>
                  <p className='text-base font-bold leading-6 text-white'>Cancel meeting</p>
                </Button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MentorCancelMeeting;
