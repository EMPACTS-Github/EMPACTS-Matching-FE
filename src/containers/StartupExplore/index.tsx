'use client';
import SearchWithLocation from '@/components/Search/SearchWithLocation';
import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab, addToast } from '@heroui/react';
import { PROFILE_MESSAGES } from '@/constants/messages';
import CompassIcon from '@/components/Icons/CompassIcon';
import { SuggestMentors } from '@/interfaces/startup';
import { SuggestMentor } from '@/interfaces/MentorProfile';
import { mentor_profile_detail } from '@/apis/mentor-profile';
import ForyouSection from '@/containers/StartupExplore/Section/ForyouSection';
import SearchSection from '@/containers/StartupExplore/Section/SearchSection';
import { DEFAULT_TOAST_TIMEOUT, TOAST_COLORS } from '@/constants/api';

interface StartupExploreProps {
  mentorList: SuggestMentors[] | undefined;
  error: string | null;
  startupId: string;
  isOwner?: boolean;
}

const StartupExplore: React.FC<StartupExploreProps> = ({
  mentorList,
  error,
  startupId,
  isOwner = false,
}) => {
  // Location feature - Hidden until backend implementation is ready
  // const [location, setLocation] = useState<string>('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mentor, setMentor] = useState<SuggestMentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState(mentor[0]);

  const fetchMentors = useCallback(async () => {
    if (!mentorList || mentorList.length === 0) return;
    try {
      const mentorDetails = await Promise.all(
        mentorList.map(async (item) => {
          const mentorData = await mentor_profile_detail(item.mentor_key);
          return {
            id: mentorData.data.mentor.id,
            name: mentorData.data.mentor.name,
            mentorUsername: mentorData.data.mentor.mentorUsername,
            phone: mentorData.data.mentor.phone,
            avtUrl: mentorData.data.mentor.avtUrl,
            status: mentorData.data.mentor.status,
            description: mentorData.data.mentor.description,
            sdgFocusExpertises: mentorData.data.mentor.sdgFocusExpertises,
            locationBased: mentorData.data.mentor.locationBased,
            skillOffered: mentorData.data.mentor.skillOffered,
            languagesSpoken: mentorData.data.mentor.languagesSpoken,
            marketFocusExpertise: mentorData.data.mentor.marketFocusExpertise,
            experienceWithFundingStage: mentorData.data.mentor.experienceWithFundingStage,
            yearOfProfessionalExperience: mentorData.data.mentor.yearOfProfessionalExperience,
            currentWorkplace: mentorData.data.mentor.currentWorkplace,
            currentPosition: mentorData.data.mentor.currentPosition,
            industryFocus: mentorData.data.mentor.industryFocus,
            matchScore: item.similarity * 100,
            isFavourite: false,
          };
        })
      );
      setMentor(mentorDetails);
      setSelectedMentor(mentorDetails[0]);
    } catch (err) {
      addToast({
        title: PROFILE_MESSAGES.SUGGESTION_MENTORS_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    }
  }, [mentorList]);

  useEffect(() => {
    if (mentorList && mentorList.length > 0) {
      fetchMentors();
    }
  }, [fetchMentors, mentorList]);

  const handleFavoriteClick = (index: number) => {
    const newMentor = [...mentor];
    newMentor[index].isFavourite = !newMentor[index].isFavourite;
    setMentor(newMentor);
  };

  const handleMentorSelect = (index: number) => {
    setSelectedMentor(mentor[index]); // Cập nhật mentor được chọn
  };

  return (
    <div className='flex flex-col items-center w-full h-screen relative z-10 gap-y-2'>
      <SearchWithLocation
        placeholder='Search for anything'
        className='w-3/5 mt-4'
        // Location feature - Hidden until backend implementation is ready
        // location={location}
        // onLocationChange={setLocation}
      />
      <Tabs aria-label='Explore' color='primary' variant='underlined' className='font-bold'>
        <Tab
          key='for-you'
          className='h-full w-full text-base'
          title={
            <div className='flex items-center space-x-2'>
              <CompassIcon className='color-empacts' />
              <span>For you</span>
            </div>
          }
        >
          <ForyouSection
            startupId={startupId}
            mentor={mentor}
            selectedMentor={selectedMentor}
            isOpen={isOpen}
            isFavourite={isFavourite}
            handleFavoriteClick={handleFavoriteClick}
            handleMentorSelect={handleMentorSelect}
            setIsOpen={setIsOpen}
            setIsFavourite={setIsFavourite}
            error={error}
            canConnect={isOwner}
          />
        </Tab>
        <Tab key='search' title='Search' className='text-base'>
          <SearchSection canConnect={isOwner} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default StartupExplore;
