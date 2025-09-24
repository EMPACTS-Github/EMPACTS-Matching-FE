'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody } from '@heroui/react';
import Button from '@/components/Button/Button';

const CancelMeeting = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) => {
  const [cancelReason, setCancelReason] = useState('');

  const handleChangeCancelReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCancelReason(e.target.value);
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
                Cancel meeting with <span className='text-primary'>Do Chi Thanh</span>
              </p>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold leading-8'>Cancel reason</p>
                <textarea
                  value={cancelReason}
                  onChange={handleChangeCancelReason}
                  rows={5}
                  className='border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-20 text-secondary resize-none focus:outline-none focus:border-secondary transition-colors'
                />
              </div>
              <div className='flex gap-4'>
                <Button variant='secondary-lg' onClick={onClose} fullWidth>
                  <p className='text-base font-bold leading-6 text-primary'>Back</p>
                </Button>
                <Button variant='primary-lg' onClick={onClose} fullWidth>
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

export default CancelMeeting;
