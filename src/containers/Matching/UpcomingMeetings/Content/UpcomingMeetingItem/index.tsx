import React from 'react';
import MeetingInfo from './MeetingInfo';
import MeetingAction from './MeetingAction';
import { ConnectionMeeting } from '@/interfaces/matching';

interface UpcomingMeetingItemProps {
  meeting: ConnectionMeeting;
  onCancelSuccess?: () => void;
}

const UpcomingMeetingItem: React.FC<UpcomingMeetingItemProps> = ({ meeting, onCancelSuccess }) => {
  return (
    <div className='max-w-[1072px] rounded-md flex flex-col gap-6 p-4 border-[1px] border-neutral-50'>
      <MeetingInfo meeting={meeting} />
      <MeetingAction meeting={meeting} onCancelSuccess={onCancelSuccess} />
    </div>
  );
};

export default UpcomingMeetingItem;
