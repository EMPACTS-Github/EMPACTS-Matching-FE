"use client";
import MentorCard from '@/components/Card/MentorCard';
import SearchWithLocation from '@/components/Search/SearchWithLocation';
import React from 'react';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import ProfileInfoCard from '@/components/Card/ProfileInfoCard';
import ConnectModal from '@/components/Modal/ConnectModal';
import { Tabs, Tab } from "@heroui/react";
import CompassIcon from '@/components/Icons/CompassIcon';

const ExploreContainer: React.FC = () => {

  const [searchValue, setSearchValue] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const tabs = ["For you", "Search", "Matching Activity"];

  const [mentor, setMentor] = React.useState([{
    name: "Mentor 1",
    location: "Location 1",
    description: "As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. You will design detailed UI layouts, create benchmarks, and develop high- fidelity prototypes while documenting UX and UI strategies.Collaborating with technical teams, you will transform designs into impactful, industry - leading products.This role combines creativity and problem - solving to create meaningful user experiences.Your journey with us is an opportunity to drive innovation and make a significant impact.",
    bio: "Make beautiful websites regardless of your design experience. Make beautiful websites regardless of your design experience.",
    avatarUrl: AvatarPlaceholder,
    matchScore: 100,
    isFavorite: false,
  }, {
    name: "Mentor 2",
    location: "Location 2",
    description: "As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. You will design detailed UI layouts, create benchmarks, and develop high- fidelity prototypes while documenting UX and UI strategies.Collaborating with technical teams, you will transform designs into impactful, industry - leading products.This role combines creativity and problem - solving to create meaningful user experiences.Your journey with us is an opportunity to drive innovation and make a significant impact.",
    bio: "Make beautiful websites regardless of your design experience. Make beautiful websites regardless of your design experience.",
    avatarUrl: AvatarPlaceholder,
    matchScore: 100,
    isFavorite: false,
  }, {
    name: "Mentor 3",
    location: "Location 3",
    description: "As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. You will design detailed UI layouts, create benchmarks, and develop high- fidelity prototypes while documenting UX and UI strategies.Collaborating with technical teams, you will transform designs into impactful, industry - leading products.This role combines creativity and problem - solving to create meaningful user experiences.Your journey with us is an opportunity to drive innovation and make a significant impact.",
    bio: "Make beautiful websites regardless of your design experience. Make beautiful websites regardless of your design experience.",
    avatarUrl: AvatarPlaceholder,
    matchScore: 50,
    isFavorite: false,
  }, {
    name: "Mentor 4",
    location: "Location 4",
    description: "As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. You will design detailed UI layouts, create benchmarks, and develop high- fidelity prototypes while documenting UX and UI strategies.Collaborating with technical teams, you will transform designs into impactful, industry - leading products.This role combines creativity and problem - solving to create meaningful user experiences.Your journey with us is an opportunity to drive innovation and make a significant impact.",
    bio: "Make beautiful websites regardless of your design experience. Make beautiful websites regardless of your design experience.",
    avatarUrl: AvatarPlaceholder,
    matchScore: 30,
    isFavorite: false,
  }, {
    name: "Mentor 5",
    location: "Location 5",
    description: "As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. You will design detailed UI layouts, create benchmarks, and develop high- fidelity prototypes while documenting UX and UI strategies.Collaborating with technical teams, you will transform designs into impactful, industry - leading products.This role combines creativity and problem - solving to create meaningful user experiences.Your journey with us is an opportunity to drive innovation and make a significant impact.",
    bio: "Make beautiful websites regardless of your design experience. Make beautiful websites regardless of your design experience.",
    avatarUrl: AvatarPlaceholder,
    matchScore: 15,
    isFavorite: false,
  }]);

  const [selectedMentor, setSelectedMentor] = React.useState(mentor[0]);

  const handleFavoriteClick = (index: number) => {
    const newMentor = [...mentor];
    newMentor[index].isFavorite = !newMentor[index].isFavorite;
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
          title={
            <div className="flex items-center space-x-2">
              <CompassIcon className="color-empacts" />
              <span>For you</span>
            </div>
          }
        />
        <Tab
          key="search"
          title="Search"
        />
        <Tab
          key="matching-activity"
          title="Matching Activity"
        />
      </Tabs>
      <div className='flex justify-between gap-4 p-4 flex-1 overflow-hidden'>
        <div className='flex flex-col gap-4 w-1/3 overflow-y-auto h-full pr-2 custom-scrollbar'>
          {mentor.map((mentor, index) => {
            return (
              <MentorCard
                key={index}
                name={mentor.name}
                location={mentor.location}
                description={mentor.description}
                avatarUrl={mentor.avatarUrl}
                matchScore={mentor.matchScore}
                isFavorite={mentor.isFavorite}
                onFavoriteClick={() => handleFavoriteClick(index)}
                onCardClick={() => handleMentorSelect(index)}
              />
            );
          })}
        </div>
        <ProfileInfoCard
          className="w-2/3"
          title={selectedMentor.name}
          location={selectedMentor.location}
          description={selectedMentor.description}
          bio={selectedMentor.bio}
          rating={4.5}
          sdg="Profile SDG"
          onFavoriteClick={() => setIsFavorite(!isFavorite)}
          isFavorite={selectedMentor.isFavorite}
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
    </div >
  );
};

export default ExploreContainer;
