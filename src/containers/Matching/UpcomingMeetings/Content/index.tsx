import React from 'react';
import UpcomingMeetingItem from './UpcomingMeetingItem';

const Content = () => {
  return (
    <div className='flex flex-col gap-4 max-h-[432px] overflow-y-auto'>
      <UpcomingMeetingItem />
      <UpcomingMeetingItem />
      <UpcomingMeetingItem />
      <UpcomingMeetingItem />
      <UpcomingMeetingItem />
    </div>
  )
}

export default Content;
