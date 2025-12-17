'use client';

import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Card, CardHeader, CardBody, Chip, addToast } from '@heroui/react';
import { UI_LABELS, PROFILE_MESSAGES } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import {
  PAST_MEETING_STATUS,
  CONNECTION_REQUEST_STATUS,
  MATCHING_STATUS,
} from '@/constants/matching';
import FilterPastMeeting from '@/containers/Matching/PastMeetings/FilterPastMeeting';
import FilterConnectionRequest from '@/containers/Matching/MentorConnectionRequest/FilterConnectionRequest';
import PastMeetings from '@/containers/Matching/PastMeetings';
import MentorUpcomingMeetings from '@/containers/Matching/MentorUpcomingMeetings';
import MentorConnectionRequest from '@/containers/Matching/MentorConnectionRequest';
import { getConnectionMeetings } from '@/apis/connection-meeting';
import { mentor_matching_request_list } from '@/apis/mentor-matching';

interface MentorMatchingNavigationProps {
  mentorId: string;
}

const MentorMatchingNavigation: React.FC<MentorMatchingNavigationProps> = ({ mentorId }) => {
  const [selected, setSelected] = useState('upcoming-meeting');
  const [currentMeetingStatus, setCurrentMeetingStatus] = useState(PAST_MEETING_STATUS[0].value);
  const [currentRequestStatus, setCurrentRequestStatus] = useState(
    CONNECTION_REQUEST_STATUS[0].value
  );
  const [upcomingMeetingsCount, setUpcomingMeetingsCount] = useState<number>(0);
  const [pendingRequestsCount, setPendingRequestsCount] = useState<number>(0);

  const handleMeetingStatusChange = (status: string) => {
    setCurrentMeetingStatus(status);
  };

  const handleRequestStatusChange = (status: string) => {
    setCurrentRequestStatus(status);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch upcoming meetings count
        const upcomingMeetings = await getConnectionMeetings({
          actor: 'mentor',
          profileId: mentorId,
          view: 'upcoming',
        });
        setUpcomingMeetingsCount(upcomingMeetings.length || 0);
      } catch (error) {
        addToast({
          title: PROFILE_MESSAGES.FETCH_UPCOMING_MEETINGS_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        setUpcomingMeetingsCount(0);
      }

      try {
        // Fetch pending connection requests count
        const pendingRequests = await mentor_matching_request_list(MATCHING_STATUS.PENDING);
        setPendingRequestsCount(pendingRequests.length || 0);
      } catch (error) {
        addToast({
          title: PROFILE_MESSAGES.FETCH_PENDING_REQUESTS_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        setPendingRequestsCount(0);
      }
    };

    if (mentorId) {
      fetchCounts();
    }
  }, [mentorId]);

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
              {upcomingMeetingsCount > 0 && (
                <Chip
                  size='sm'
                  variant='solid'
                  color={selected == 'upcoming-meeting' ? 'primary' : 'secondary'}
                >
                  {upcomingMeetingsCount}
                </Chip>
              )}
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
              <MentorUpcomingMeetings mentorId={mentorId} />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key='connection-request'
          title={
            <div className='flex items-center space-x-2'>
              <span>{UI_LABELS.CONNECTION_REQUEST}</span>
              {pendingRequestsCount > 0 && (
                <Chip
                  size='sm'
                  variant='solid'
                  color={selected == 'connection-request' ? 'primary' : 'secondary'}
                >
                  {pendingRequestsCount}
                </Chip>
              )}
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
                  <p className='text-sm text-default-500'> Request to connect from Startups</p>
                </div>
                <FilterConnectionRequest
                  currentRequestStatus={currentRequestStatus}
                  onChangeRequestStatus={handleRequestStatusChange}
                />
              </div>
            </CardHeader>
            <CardBody>
              <MentorConnectionRequest mentorId={mentorId} />
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
              <PastMeetings 
                actor='mentor' 
                profileId={mentorId} 
                filterStatus={currentMeetingStatus} 
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MentorMatchingNavigation;
