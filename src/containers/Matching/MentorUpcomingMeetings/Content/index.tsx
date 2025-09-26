import React from 'react';
import MentorUpcomingMeetingItem from './MentorUpcomingMeetingItem';

// Mock data for upcoming meetings
const mockMeetings = [
  {
    id: '1',
    startupName: 'The Amazing Team',
    startupLocation: 'Hanoi, Vietnam',
    startupAvatar:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face',
    meetingTitle: 'EMPACTS Connect: Le Phuong Nam <> The Amazing Team',
    meetingDateTime: 'Monday, August 4th, 2025 at 1:30PM - 4:30PM',
    googleMeetLink: 'meet.google.com/ktq-edyu-ydj',
    representative: {
      name: 'Do Chi Thanh',
      email: 'memberA@startup.com',
    },
  },
  {
    id: '2',
    startupName: 'TechFlow Solutions',
    startupLocation: 'Ho Chi Minh City, Vietnam',
    startupAvatar:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=64&h=64&fit=crop&crop=face',
    meetingTitle: 'EMPACTS Connect: Le Phuong Nam <> TechFlow Solutions',
    meetingDateTime: 'Tuesday, August 5th, 2025 at 2:00PM - 5:00PM',
    googleMeetLink: 'meet.google.com/abc-defg-hij',
    representative: {
      name: 'Nguyen Van Duc',
      email: 'duc@techflow.com',
    },
  },
  {
    id: '3',
    startupName: 'Green Innovation Hub',
    startupLocation: 'Da Nang, Vietnam',
    startupAvatar:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=face',
    meetingTitle: 'EMPACTS Connect: Le Phuong Nam <> Green Innovation Hub',
    meetingDateTime: 'Wednesday, August 6th, 2025 at 10:00AM - 1:00PM',
    googleMeetLink: 'meet.google.com/xyz-uvwx-rst',
    representative: {
      name: 'Tran Thi Linh',
      email: 'linh@greeninnovation.vn',
    },
  },
];

const Content = () => {
  return (
    <div className='flex flex-col gap-6 h-full max-h-[40vh] overflow-y-auto'>
      {mockMeetings.map((meeting) => (
        <MentorUpcomingMeetingItem key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
};

export default Content;
