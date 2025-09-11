'use client';

import React, { useState } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { UI_LABELS } from '@/constants';
import Calendar from '@/components/Calendar/Calendar';

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
          <Calendar />
        </Tab>
        <Tab key='upcoming-meeting' title={UI_LABELS.UPCOMING_MEETING} className='px-2'></Tab>
        <Tab key='sent-invitation' title={UI_LABELS.SENT_INVITATION} className='px-2'></Tab>
        <Tab key='past-meeting' title={UI_LABELS.PAST_MEETING} className='px-2'></Tab>
      </Tabs>
    </div>
  );
};

export default StartupMatchingNavigation;
