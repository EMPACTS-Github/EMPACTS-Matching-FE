import React from 'react';
import Content from './Content';

interface MentorUpcomingMeetingsProps {
  mentorId: string;
}

const MentorUpcomingMeetings: React.FC<MentorUpcomingMeetingsProps> = ({ mentorId }) => {
  return <Content mentorId={mentorId} />;
};

export default MentorUpcomingMeetings;
