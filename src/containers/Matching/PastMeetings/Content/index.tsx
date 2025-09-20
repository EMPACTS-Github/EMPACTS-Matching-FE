import React from 'react'
import PastMeetingItem from './PastMeetingItem';
import { MEETING_STATUS } from '@/constants/matching';

const Content = () => {
  return (
    <div className='flex flex-col gap-4 max-h-[432px] overflow-y-auto'>
      <PastMeetingItem status={MEETING_STATUS.COMPLETED} />
      <PastMeetingItem status={MEETING_STATUS.CANCELLED} />
      <PastMeetingItem status={MEETING_STATUS.EXPIRED} />
      <PastMeetingItem status={MEETING_STATUS.CANCELLED} />
      <PastMeetingItem status={MEETING_STATUS.COMPLETED} />
    </div>
  );
}

export default Content;
