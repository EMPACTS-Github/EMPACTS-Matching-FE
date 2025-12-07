/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { Tab, Tabs, addToast } from '@heroui/react';
import { mentor_profile_detail } from '@/apis/mentor-profile';
import MentorProfileContainer from '@/containers/MentorProfile/MentorProfileContainer';
import { mentor_matching_request_list } from '@/apis/mentor-matching';
import { useErrorStore } from '@/stores/error-store';
import { Mentor } from '@/interfaces/MentorProfile';
import { MATCHING_STATUS } from '@/constants/matching';
import { UI_LABELS, PROFILE_MESSAGES } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import MentorMatchingNavigation from '@/components/Navigation/MentorMatchingNavigation';

interface MentorProfileNavigationProps {
  mentorId: string;
}

const MentorProfileNavigation: React.FC<MentorProfileNavigationProps> = ({ mentorId }) => {
  const [selectedTab, setSelectedTab] = useState('matching');
  const setError = useErrorStore((state) => state.setError);
  const [mentorProfile, setMentorProfile] = useState<Mentor | null>(null);
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
  }, [mentorId]);

  useEffect(() => {
    const fetchMatchingRequestList = async () => {
      try {
        const matchingRequestList = await mentor_matching_request_list(MATCHING_STATUS.ACCEPTED);
        setCountMatchedRequests(matchingRequestList.length);
      } catch (err: any) {
        if (
          err?.response?.status === 404 &&
          err?.response?.data?.code === 'MATCHING_LIST_REQUEST_FROM_STARTUP_NOT_FOUND'
        ) {
          addToast({
            title: PROFILE_MESSAGES.NO_MATCHING_REQUEST_FOUND,
            color: TOAST_COLORS.WARNING,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
        } else {
          addToast({
            title: PROFILE_MESSAGES.FETCH_MATCHING_REQUESTS_FAILED,
            color: TOAST_COLORS.DANGER,
            timeout: DEFAULT_TOAST_TIMEOUT,
          });
        }
        setCountMatchedRequests(0);
      }
    };
    fetchMatchingRequestList();
  }, [mentorId]);

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
          <Tab key='matching' title={UI_LABELS.MATCHING} className='pt-0 px-2'>
            <div className='flex justify-center w-full'>
              <MentorMatchingNavigation mentorId={mentorId} />
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
