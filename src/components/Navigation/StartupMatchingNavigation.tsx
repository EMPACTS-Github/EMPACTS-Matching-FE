'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { startup_profile_detail } from '@/apis/startup-profile';
import { StartupProfileResponse } from '@/interfaces/StartupProfile';
import StartupExploreContainer from '@/containers/StartupExplore';
import StartupMemberContainer from '@/containers/StartupMember';
import StartupProfileContainer from '@/containers/StartupProfile';
import { suggest_mentor_list } from '@/apis/suggest-mentor';
import { SuggestMentors } from '@/interfaces/startup';
import { useStartupIdStore } from '@/stores/startup-store';
import { UI_LABELS, SUGGESTION_MESSAGES, CONSOLE_ERRORS, API_ERROR_CODES } from '@/constants';
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
