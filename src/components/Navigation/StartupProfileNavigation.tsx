"use client";

import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from "@heroui/react";
import { startup_profile_detail } from "@/apis/startup-profile"
import { StartupProfileResponse } from "@/interfaces/StartupProfile";
import ExploreContainer from '@/containers/Explore/ExploreContainer';
import StartupMemberContainer from '@/containers/StartupMember/StartupMemberContainer';
import StartupProfileContainer from '@/containers/StartupProfile/StartupProfileContainer';
import { suggest_mentor_list } from "@/apis/suggest-mentor";
import { SuggestMentors } from '@/interfaces/startup';
import { useStartupIdStore } from '@/stores/startup-store';

interface StartupProfileNavigationProps {
  startupId: string;
}

const StartupProfileNavigation: React.FC<StartupProfileNavigationProps> = ({
  startupId,
}) => {
  const [selected, setSelected] = useState("explore");
  const [startup_profile, setStartupProfile] = useState<StartupProfileResponse>();
  const [suggestedMentors, setSuggestedMentors] = useState<SuggestMentors[]>([{} as SuggestMentors]);
  const [error, setError] = useState<string | null>(null);
  const setStartupId = useStartupIdStore((state) => state.setStartupId);
  setStartupId(startupId);

  useEffect(() => {
    const fetchStartupProfile = async () => {
      try {
        const data = await startup_profile_detail(startupId);
        setStartupProfile(data.data);
      } catch (err) {
        console.error('Failed to fetch startup profile:', err);
      }
    };
    fetchStartupProfile();
  }, [startupId]);

  useEffect(() => {
    const suggestMentorList = async () => {
      try {
        const suggestedMentorList = await suggest_mentor_list({ startupId: startupId });
        setSuggestedMentors(suggestedMentorList.data);
      } catch (err: any) {
        if (
          err?.response?.status === 404 &&
          err?.response?.data?.code === "SUGGESTION_NOT_FOUND"
        ) {
          setError("No suggestion found");
        } else {
          setError("Failed to fetch suggestion mentor");
        }
        console.error('Failed to fetch suggested mentors:', err);
      }
    };
    suggestMentorList();
  }, [startup_profile, startupId]);

  return (
    <div className="w-full border-b border-gray-200 flex justify-center">
      <div className="flex-col w-full">
        <Tabs
          aria-label="Startup profile tabs"
          color="primary"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={setSelected as any}
          className="w-full font-bold bg-white xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4"
        >
          <Tab
            key="explore"
            title="Explore"
            className="pt-0 px-2"
          >
            <ExploreContainer mentorList={suggestedMentors} error={error} />
          </Tab>
          <Tab
            key="profile"
            title="Profile"
            className="pt-0 px-2"
          >
            <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
              <StartupProfileContainer startup_profile={startup_profile} />
            </div>
          </Tab>
          <Tab
            key="member"
            title="Member"
            className="pt-0 px-2"
          >
            <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
              <StartupMemberContainer startup_profile={startup_profile} />
            </div>
          </Tab>
        </Tabs >
      </div >
    </div >
  );
};

export default StartupProfileNavigation; 