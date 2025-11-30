import React from 'react';
import Content from './Content';

interface MentorConnectionRequestProps {
  mentorId: string;
}

const MentorConnectionRequest: React.FC<MentorConnectionRequestProps> = ({ mentorId }) => {
  return <Content mentorId={mentorId} />;
};

export default MentorConnectionRequest;
