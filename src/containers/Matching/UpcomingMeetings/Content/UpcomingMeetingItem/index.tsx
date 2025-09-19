import React from 'react';
import MeetingInfo from './MeetingInfo';
import MeetingAction from './MeetingAction';

const UpcomingMeetingItem = () => {
  return (
    <div className='max-w-[1072px] rounded-md flex flex-col gap-6 p-4 border-[1px] border-neutral-50'>
      <MeetingInfo />
      <MeetingAction />
    </div>
  );
}

export default UpcomingMeetingItem;
