'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody, addToast } from '@heroui/react';
import Button from '@/components/Button/Button';
import { PROFILE_MESSAGES } from '@/constants';

interface CancelMeetingProps {
  isOpen: boolean;
  onOpenChange: () => void;
  meetingId: string;
  mentorName: string;
  onCancelSuccess?: () => void;
}

const CancelMeeting: React.FC<CancelMeetingProps> = ({
  isOpen,
  onOpenChange,
  meetingId,
  mentorName,
  onCancelSuccess,
}) => {
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeCancelReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCancelReason(e.target.value);
  };

  const handleCancelMeeting = async () => {
    if (!cancelReason.trim()) {
      addToast({
        title: 'Please provide a reason for cancellation',
        color: 'warning',
        timeout: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API when available
      // const response = await cancelConnectionMeeting(meetingId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock success response
      console.log('Meeting cancelled:', {
        meetingId,
        reason: cancelReason,
        mentor: mentorName,
      });

      addToast({
        title: 'Meeting cancelled successfully',
        color: 'success',
        timeout: 3000,
      });

      setCancelReason('');
      onOpenChange();

      // Trigger parent refresh if callback provided
      if (onCancelSuccess) {
        onCancelSuccess();
      }
    } catch (error: any) {
      console.error('Error cancelling meeting:', error);
      addToast({
        title: error?.message || PROFILE_MESSAGES.GENERAL_ERROR,
        color: 'danger',
        timeout: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (!isSubmitting) {
      setCancelReason('');
      onOpenChange();
    }
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
                Cancel meeting with <span className='text-primary'>{mentorName}</span>
              </p>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold leading-8'>Cancel reason</p>
                <textarea
                  value={cancelReason}
                  onChange={handleChangeCancelReason}
                  rows={5}
                  placeholder='Please provide a reason for cancelling this meeting...'
                  className='border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-20 text-secondary resize-none focus:outline-none focus:border-secondary transition-colors'
                  disabled={isSubmitting}
                />
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='secondary-lg'
                  onClick={handleBack}
                  fullWidth
                  disabled={isSubmitting}
                >
                  <p className='text-base font-bold leading-6 text-primary'>Back</p>
                </Button>
                <Button
                  variant='primary-lg'
                  onClick={handleCancelMeeting}
                  fullWidth
                  disabled={isSubmitting}
                >
                  <p className='text-base font-bold leading-6 text-white'>
                    {isSubmitting ? 'Cancelling...' : 'Cancel meeting'}
                  </p>
                </Button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelMeeting;
