import React from 'react';
import MeetingDetail from './MeetingDetail';
import Button from '@/components/Button/Button';

interface PastMeetingItemProps {
  status: string;
}

const PastMeetingItem = ({ status }: PastMeetingItemProps) => {
  return (
    <div className='flex justify-between p-4 border-1 border-neutral-50 rounded-md max-w-[1072px]'>
      <MeetingDetail status={status} />
      <Button variant='primary-md' className='py-3 px-6'>
        <p className='text-base font-bold leading-6 text-white'>Reconnect</p>
      </Button>
    </div>
  );
};

export default PastMeetingItem;
