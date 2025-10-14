import React from 'react';
import { ConnectionMeeting } from '@/interfaces/matching';

interface HostInfoProps {
  meeting: ConnectionMeeting;
}

// Helper function to format date with ordinal
const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// Format date range from start_at and end_at
const formatMeetingDateTime = (startAt: string, endAt: string) => {
  const start = new Date(startAt);
  const end = new Date(endAt);

  const weekday = start.toLocaleDateString('en-US', { weekday: 'long' });
  const month = start.toLocaleDateString('en-US', { month: 'long' });
  const day = getOrdinal(start.getDate());
  const year = start.getFullYear();

  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${weekday}, ${month} ${day}, ${year} at ${startTime} - ${endTime}`;
};

const HostInfo: React.FC<HostInfoProps> = ({ meeting }) => {
  const meetingDateTime = formatMeetingDateTime(meeting.start_at, meeting.end_at);

  return (
    <div className='max-w-[450px] flex flex-col gap-1 '>
      <p className='text-xl font-bold leading-8'>{meeting.title}</p>
      <p className='text-base font-normal leading-6'>{meetingDateTime}</p>
    </div>
  );
};

export default HostInfo;
