'use client';

import React, { useState } from 'react';
import { Tab, Tabs, Card, CardHeader, CardBody, Chip } from '@heroui/react';
import { UI_LABELS } from '@/constants';
import { PAST_MEETING_STATUS, CONNECTION_REQUEST_STATUS } from '@/constants/matching';
import FilterPastMeeting from '@/containers/Matching/PastMeetings/FilterPastMeeting';
import FilterConnectionRequest from '@/containers/Matching/MentorConnectionRequest/FilterConnectionRequest';
import PastMeetings from '@/containers/Matching/PastMeetings';
import MentorUpcomingMeetings from '@/containers/Matching/MentorUpcomingMeetings';
import MentorConnectionRequest from '@/containers/Matching/MentorConnectionRequest';

interface MentorMatchingNavigationProps {
  mentorId: string;
}

const MentorMatchingNavigation: React.FC<MentorMatchingNavigationProps> = ({ mentorId }) => {
  const [selected, setSelected] = useState('upcoming-meeting');
  const [currentMeetingStatus, setCurrentMeetingStatus] = useState(PAST_MEETING_STATUS[0].value);
  const [currentRequestStatus, setCurrentRequestStatus] = useState(
    CONNECTION_REQUEST_STATUS[0].value
  );

  const handleMeetingStatusChange = (status: string) => {
    setCurrentMeetingStatus(status);
  };

  const handleRequestStatusChange = (status: string) => {
    setCurrentRequestStatus(status);
  };

  return (
    <div className='w-full flex flex-col justify-center mt-8'>
      <Tabs
        aria-label='Startup matching tabs'
        color='primary'
        variant='underlined'
        selectedKey={selected}
        onSelectionChange={setSelected as any}
        className='w-full font-bold flex justify-center'
      >
        <Tab
          key='upcoming-meeting'
          title={
            <div className='flex items-center space-x-2'>
              <span>{UI_LABELS.UPCOMING_MEETING}</span>
              <Chip
                size='sm'
                variant='solid'
                color={selected == 'upcoming-meeting' ? 'primary' : 'secondary'}
              >
                2
              </Chip>
            </div>
          }
          className='px-2'
        >
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex flex-col'>
                <p className='text-lg font-bold text-primary'>Upcoming Meetings</p>
                <p className='text-sm text-default-500'>
                  Your confirmed meetings and scheduled calls.
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <MentorUpcomingMeetings />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key='connection-request'
          title={
            <div className='flex items-center space-x-2'>
              <span>{UI_LABELS.CONNECTION_REQUEST}</span>
              <Chip
                size='sm'
                variant='solid'
                color={selected == 'connection-request' ? 'primary' : 'secondary'}
              >
                2
              </Chip>
            </div>
          }
          className='px-2'
        >
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                  <p className='text-lg font-bold text-primary'>Connection Request</p>
                  <p className='text-sm text-default-500'>placeholder text</p>
                </div>
                <FilterConnectionRequest
                  currentRequestStatus={currentRequestStatus}
                  onChangeRequestStatus={handleRequestStatusChange}
                />
              </div>
            </CardHeader>
            <CardBody>
              <MentorConnectionRequest />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='past-meeting' title={UI_LABELS.PAST_MEETING} className='px-2'>
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                  <p className='text-lg font-bold text-primary'> Past Meetings</p>
                  <p className='text-sm text-default-500'>
                    Review your completed meetings and access summaries.
                  </p>
                </div>
                <FilterPastMeeting
                  currentMeetingStatus={currentMeetingStatus}
                  onChangeMeetingStatus={handleMeetingStatusChange}
                />
              </div>
            </CardHeader>
            <CardBody>
              <PastMeetings />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MentorMatchingNavigation;
