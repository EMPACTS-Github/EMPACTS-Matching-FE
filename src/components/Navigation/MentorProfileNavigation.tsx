/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { mentor_profile_detail } from '@/apis/mentor-profile';
import MentorExploreContainer from '@/containers/MentorExplore/MentorExploreContainer';
import MentorProfileContainer from '@/containers/MentorProfile/MentorProfileContainer';
import { mentor_matching_request_list } from '@/apis/mentor-matching';
import { useErrorStore } from '@/stores/error-store';
import { useMatchingRequestListStore } from '@/stores/matching-store';
import { Mentor } from '@/interfaces/MentorProfile';
import { MATCHING_STATUS } from '@/constants/matching';

interface MentorProfileNavigationProps {
  mentorId: string;
}

const MentorProfileNavigation: React.FC<MentorProfileNavigationProps> = ({ mentorId }) => {
  const [selectedTab, setSelectedTab] = useState('explore');
  const setError = useErrorStore((state) => state.setError);
  const [mentorProfile, setMentorProfile] = useState<Mentor | null>(null);
  const setMatchingRequestList = useMatchingRequestListStore(
    (state) => state.setMatchingRequestList
  );
  const [countMatchedRequests, setCountMatchedRequests] = useState<number>(0);

  const fetchMentorProfile = async () => {
    try {
      const data = await mentor_profile_detail(mentorId);
      setMentorProfile(data.data.mentor);
    } catch (err) {
      setError('Failed to fetch mentor profile');
      console.error('Failed to fetch mentor profile:', err);
    }
  };

  useEffect(() => {
    fetchMentorProfile();
  }, [mentorId, setError]);

  useEffect(() => {
    const matchingRequestList = async () => {
      try {
        const matchingRequestList = await mentor_matching_request_list(mentorId);
        setMatchingRequestList(matchingRequestList.data);
        setCountMatchedRequests(
          matchingRequestList.data.filter((match: any) => match.status === MATCHING_STATUS.ACCEPTED)
            .length
        );
      } catch (err: any) {
        if (
          err?.response?.status === 404 &&
          err?.response?.data?.code === 'MATCHING_LIST_REQUEST_FROM_STARTUP_NOT_FOUND'
        ) {
          setError('No matching request found for this mentor.');
        } else {
          setError('Failed to fetch matching requests.');
        }
        console.error('Failed to fetch matching requests:', err);
      }
    };
    matchingRequestList();
  }, [mentorId, setMatchingRequestList, setError]);

  return (
    <div className='w-full flex justify-center'>
      <div className='flex-col w-full'>
        <Tabs
          aria-label='Mentor profile tabs'
          color='primary'
          variant='underlined'
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab as any}
          className='w-full font-bold bg-white 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4'
        >
          <Tab key='explore' title='Explore' className='pt-0 px-2'>
            <div className='flex flex-col items-center w-full h-screen 2xl:px-[20%] 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4 relative z-10 gap-y-2'>
              <MentorExploreContainer mentorId={mentorId} />
            </div>
          </Tab>
          <Tab key='profile' title='Profile' className='pt-0 px-2'>
            <MentorProfileContainer
              onFetchMentorProfile={fetchMentorProfile}
              mentorProfile={mentorProfile}
              matchingRequestAccepted={countMatchedRequests}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MentorProfileNavigation;
