'use client';

import React, { useState, useEffect } from 'react';
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

interface StartupProfileNavigationProps {
  startupId: string;
}

const StartupProfileNavigation: React.FC<StartupProfileNavigationProps> = ({ startupId }) => {
  const [selected, setSelected] = useState('explore');
  const [startup_profile, setStartupProfile] = useState<StartupProfileResponse>();
  const [suggestedMentors, setSuggestedMentors] = useState<SuggestMentors[]>([
    {} as SuggestMentors,
  ]);
  const [error, setError] = useState<string | null>(null);
  const setStartupId = useStartupIdStore((state) => state.setStartupId);

  const fetchStartupProfile = async () => {
    try {
      const data = await startup_profile_detail(startupId);
      setStartupProfile(data.data);
    } catch (err) {
      console.error(CONSOLE_ERRORS.FETCH_STARTUP_PROFILE_FAILED, err);
    }
  };

  const suggestMentorList = async () => {
    try {
      const suggestedMentorList = await suggest_mentor_list({ startupId: startupId });
      setSuggestedMentors(suggestedMentorList.data);
    } catch (err: any) {
      if (
        err?.response?.status === 404 &&
        err?.response?.data?.code === API_ERROR_CODES.SUGGESTION_NOT_FOUND
      ) {
        setError(SUGGESTION_MESSAGES.NO_SUGGESTION_FOUND);
      } else {
        setError(SUGGESTION_MESSAGES.FETCH_SUGGESTION_FAILED);
      }
      console.error(CONSOLE_ERRORS.FETCH_SUGGESTED_MENTORS_FAILED, err);
    }
  };

  useEffect(() => {
    setStartupId(startupId);
    fetchStartupProfile();
    suggestMentorList();
  }, [startupId]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex-col w-full">
        <Tabs
          aria-label="Startup profile tabs"
          color="primary"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={setSelected as any}
          className="w-full font-bold bg-white 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4"
        >
          <Tab key="explore" title={UI_LABELS.EXPLORE} className="pt-0 px-2">
            <StartupExploreContainer mentorList={suggestedMentors} error={error} />
          </Tab>
          <Tab key="profile" title={UI_LABELS.PROFILE} className="pt-0 px-2">
            <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
              <StartupProfileContainer
                onFetchStartupProfile={fetchStartupProfile}
                startup_profile={startup_profile}
              />
            </div>
          </Tab>
          <Tab key="member" title={UI_LABELS.MEMBER} className="pt-0 px-2">
            <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
              <StartupMemberContainer
                onFetchStartupProfile={fetchStartupProfile}
                startup_profile={startup_profile}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default StartupProfileNavigation;
