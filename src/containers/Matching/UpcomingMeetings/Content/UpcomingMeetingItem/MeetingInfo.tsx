import React from 'react';
import MeetingDetail from './MeetingDetail';
import JoinMeetingAction from './JoinMeetingAction';
import { ConnectionMeeting } from '@/interfaces/matching';

interface MeetingInfoProps {
  meeting: ConnectionMeeting;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({ meeting }) => {
  return (
    <div className='max-w-[1040px] flex justify-between min-h-[92px]'>
      <MeetingDetail meeting={meeting} />
      <JoinMeetingAction meetLink={meeting.meet_link} />
    </div>
  );
};

export default MeetingInfo;
