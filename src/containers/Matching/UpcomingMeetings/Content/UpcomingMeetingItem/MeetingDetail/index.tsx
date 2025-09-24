import React from 'react';
import AttendeeInfo from './AttendeeInfo';
import HostInfo from './HostInfo';

const MeetingDetail = () => {
  return (
    <div className='flex gap-10 max-w-[790px]'>
      <AttendeeInfo />
      <HostInfo />
    </div>
  );
};

export default MeetingDetail;
