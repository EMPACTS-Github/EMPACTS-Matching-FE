import React from 'react';
import Content from './Content';

interface PastMeetingsProps {
  actor: 'mentor' | 'startup';
  profileId: string;
  filterStatus: string;
}

const PastMeetings: React.FC<PastMeetingsProps> = ({ actor, profileId, filterStatus }) => {
  return <Content actor={actor} profileId={profileId} filterStatus={filterStatus} />;
};

export default PastMeetings;
