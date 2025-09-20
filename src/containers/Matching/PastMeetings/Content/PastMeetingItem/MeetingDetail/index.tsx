import React from 'react'
import AttendeeInfo from './AttendeeInfo';
import HostInfo from './HostInfo';

interface MeetingDetailProps {
  status: string;
}

const MeetingDetail = ({ status }: MeetingDetailProps) => {
  return (
    <div className='flex gap-10 max-w-[840px]'>
      <AttendeeInfo status={status} />
      <HostInfo status={status} />  
    </div>
  )
}

export default MeetingDetail;
