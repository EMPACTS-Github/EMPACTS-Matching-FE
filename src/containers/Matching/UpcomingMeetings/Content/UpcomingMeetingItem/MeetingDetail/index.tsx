import React from 'react';
import AttendeeInfo from './AttendeeInfo';
import HostInfo from './HostInfo';
import { ConnectionMeeting } from '@/interfaces/matching';

interface MeetingDetailProps {
  meeting: ConnectionMeeting;
}

const MeetingDetail: React.FC<MeetingDetailProps> = ({ meeting }) => {
  return (
    <div className='flex gap-10 max-w-[790px]'>
      <AttendeeInfo meeting={meeting} />
      <HostInfo meeting={meeting} />
    </div>
  );
};

export default MeetingDetail;
