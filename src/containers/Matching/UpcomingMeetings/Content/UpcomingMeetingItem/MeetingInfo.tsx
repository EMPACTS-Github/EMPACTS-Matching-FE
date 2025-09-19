import React from 'react'
import MeetingDetail from './MeetingDetail';
import JoinMeetingAction from './JoinMeetingAction';

const MeetingInfo = () => {
  return (
    <div className='max-w-[1040px] flex justify-between min-h-[92px]'>
      <MeetingDetail />
      <JoinMeetingAction />
    </div>
  );
};

export default MeetingInfo;
