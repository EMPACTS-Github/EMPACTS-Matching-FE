'use client';

import React, { useState } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { UI_LABELS } from '@/constants';
import { Card, CardHeader, CardBody } from '@heroui/react';
import ScheduleMeetingContainer from '@/containers/Matching/ScheduleMeeting';

interface StartupMatchingNavigationProps {
  startupId: string;
}

const StartupMatchingNavigation: React.FC<StartupMatchingNavigationProps> = ({ startupId }) => {
  const [selected, setSelected] = useState('schedule-meeting');
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
        <Tab key='schedule-meeting' title={UI_LABELS.SCHEDULE_MEETING} className='px-2'>
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex flex-col'>
                <p className='text-lg font-bold text-primary'>Schedule a Meeting</p>
                <p className='text-sm text-default-500'>
                  s Select a matched mentor to start scheduling.
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <ScheduleMeetingContainer startupId={startupId} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='upcoming-meeting' title={UI_LABELS.UPCOMING_MEETING} className='px-2'>
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex flex-col'>
                <p className='text-lg font-bold text-primary'>Upcoming Meeting</p>
                <p className='text-sm text-default-500'>
                  Your confirmed meetings and scheduled calls.
                </p>
              </div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key='sent-invitation' title={UI_LABELS.SENT_INVITATION} className='px-2'>
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex flex-col'>
                <p className='text-lg font-bold text-primary'>Sent Invitations</p>
                <p className='text-sm text-default-500'>Mentors you have invited to connect.</p>
              </div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key='past-meeting' title={UI_LABELS.PAST_MEETING} className='px-2'>
          <Card
            shadow='sm'
            className='2xl:mx-[20%] xl:mx-56 lg:mx-48 md:mx-32 sm:mx-16 xs:mx-8 mx-4 px-3 py-2'
          >
            <CardHeader className=''>
              <div className='flex flex-col'>
                <p className='text-lg font-bold text-primary'> Past Meetings</p>
                <p className='text-sm text-default-500'>
                  Review your completed meetings and access summaries.
                </p>
              </div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default StartupMatchingNavigation;
