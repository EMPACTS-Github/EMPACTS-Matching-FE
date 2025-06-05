"use client";
import MentorCard from '@/components/Card/MentorCard';
import SearchWithLocation from '@/components/Search/SearchWithLocation';
import React, { useState, useEffect, use } from 'react';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import ProfileInfoCard from '@/components/Card/ProfileInfoCard';
import ConnectModal from '@/components/Modal/ConnectModal';
import { Tabs, Tab } from "@heroui/react";
import CompassIcon from '@/components/Icons/CompassIcon';
import { SuggestMentors } from '@/interfaces/startup';
import { SuggestMentor } from '@/interfaces/MentorProfile';
import { mentor_profile_detail } from "@/apis/mentor-profile";
import { Spinner } from "@heroui/react";
import { getProvince } from '@/utils/getProvince'

interface ExploreContainerProps {
  mentorList: SuggestMentors[] | undefined;
}

const ExploreContainer: React.FC<ExploreContainerProps> = ({ mentorList }) => {

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
          className='h-full'
          title={
            <div className="flex items-center space-x-2">
              <CompassIcon className="color-empacts" />
              <span>For you</span>
            </div>
          }
        >
          {mentor.length !== 0 ? (
            <div className='flex justify-between gap-4 p-4 flex-1 overflow-hidden'>
              <div className='flex flex-col gap-4 w-[30%] overflow-y-auto h-full pr-2 custom-scrollbar'>
                {mentor.map((mentor, index) => {
                  return (
                    <MentorCard
                      key={index}
                      name={mentor.name}
                      location={getProvince(mentor?.locationBased || '')}
                      description={mentor.description}
                      avatarUrl={mentor.avtUrl}
                      matchScore={mentor.matchScore}
                      isFavorite={mentor.isFavourite}
                      onFavoriteClick={() => handleFavoriteClick(index)}
                      onCardClick={() => handleMentorSelect(index)}
                    />
                  );
                })}
              </div>
              <ProfileInfoCard
                className="w-[70%]"
                title={selectedMentor.name}
                location={getProvince(selectedMentor?.locationBased || '')}
                description={selectedMentor.description}
                rating={4.5}
                sdg="Profile SDG"
                onFavoriteClick={() => setIsFavourite(!isFavourite)}
                isFavorite={selectedMentor.isFavourite}
                avtUrl={selectedMentor.avtUrl}
                onClickButton={() => {
                  setIsOpen(true);
                }}
              />
              <ConnectModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                mentorName='Do Chi Thanh'
              />
            </div>
          ) : (
            <div className='flex justify-center items-center h-[50%]'>
              <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is finding the best mentors for you. Please wait..." variant="wave" />
            </div>
          )
          }
        </Tab>
        <Tab
          key="search"
          title="Search"
        />
        <Tab
          key="matching-activity"
          title="Matching Activity"
        />
      </Tabs>
    </div >
  );
};

export default ExploreContainer;
