"use client";
import SearchWithLocation from '@/components/Search/SearchWithLocation';
import React, { useState, useEffect, use } from 'react';
import { Tabs, Tab } from "@heroui/react";
import CompassIcon from '@/components/Icons/CompassIcon';
import { SuggestMentors } from '@/interfaces/startup';
import { SuggestMentor } from '@/interfaces/MentorProfile';
import { mentor_profile_detail } from "@/apis/mentor-profile";
import ForyouSection from './Section/ForyouSection';
import MatchingActivitySection from './Section/MatchingActivitySection';
import SearchSection from './Section/SearchSection';

interface ExploreContainerProps {
  startupId: string;
  mentorList: SuggestMentors[] | undefined;
  error: string | null;
}

const ExploreContainer: React.FC<ExploreContainerProps> = ({ mentorList, error, startupId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [location, setLocation] = useState<string>('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mentor, setMentor] = useState<SuggestMentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState(mentor[0]);
  useEffect(() => {
    const fetchMentors = async () => {
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
              matchScore: item.similarity * 100,
              isFavourite: false,
            };
          })
        );
        setMentor(mentorDetails);
        setSelectedMentor(mentorDetails[0]);
      } catch (err) {
        console.error('Failed to fetch mentors profile:', err);
      }
    };
    fetchMentors();
  }, [mentorList]);
  const handleFavoriteClick = (index: number) => {
    const newMentor = [...mentor];
    newMentor[index].isFavourite = !newMentor[index].isFavourite;
    setMentor(newMentor);
  };

  const handleMentorSelect = (index: number) => {
    setSelectedMentor(mentor[index]); // Cập nhật mentor được chọn
  };

  return (
    <div className="flex flex-col items-center w-full h-screen 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4 relative z-10 gap-y-2">
      <SearchWithLocation
        placeholder="Search for anything"
        className="w-3/5 mt-4"
        value={searchValue}
        location={location}
        onChange={setSearchValue}
        onLocationChange={setLocation}
      />
      <Tabs
        aria-label="Explore" color="primary" variant="underlined" className='font-bold'>
        <Tab
          key="for-you"
          className='h-full w-full'
          title={
            <div className="flex items-center space-x-2">
              <CompassIcon className="color-empacts" />
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
          />
        </Tab>
        <Tab
          key="search"
          title="Search"
        >
          <SearchSection />
        </Tab>
        <Tab
          key="matching-activity"
          title="Matching Activity"
          className='h-full w-full'
        >
          <MatchingActivitySection startupId={startupId} />
        </Tab>
      </Tabs>
    </div >
  );
};

export default ExploreContainer;
