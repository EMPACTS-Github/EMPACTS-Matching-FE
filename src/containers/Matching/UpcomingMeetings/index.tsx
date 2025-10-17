import React from 'react';
import Header from './Header';
import Content from './Content';

interface UpcomingMeetingsProps {
  startupId: string;
}

const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({ startupId }) => {
  return <Content startupId={startupId} />;
};

export default UpcomingMeetings;
