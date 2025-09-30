import React from 'react';
import MentorConnectionRequestItem from './MentorConnectionRequestItem';

// Mock data for connection requests
const mockConnectionRequests = [
  {
    startupId: '5cf00f73-1f01-4cf7-a34f-9395d599cb06',
    startupName: 'The Amazing Team',
    startupLocation: 'Hanoi, Vietnam',
    startupAvatar:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face',
    meetingStatus: 'Pending',
  },
  {
    startupId: '83ef0be8-01e7-4a06-863d-50e9c877cb94',
    startupName: 'TechFlow Solutions',
    startupLocation: 'Ho Chi Minh City, Vietnam',
    startupAvatar:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=64&h=64&fit=crop&crop=face',
    meetingStatus: 'Pending',
  },
  {
    startupId: '8ea8abe6-f34d-4f4d-99fd-c1125bdc994f',
    startupName: 'Green Innovation Hub',
    startupLocation: 'Da Nang, Vietnam',
    startupAvatar:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=face',
    meetingStatus: 'Accepted',
  },
];

const Content = () => {
  return (
    <div className='flex flex-col gap-6 h-full max-h-[40vh] overflow-y-auto'>
      {mockConnectionRequests.map((req) => (
        <MentorConnectionRequestItem key={req.startupId} request={req} />
      ))}
    </div>
  );
};

export default Content;
