"use client";
import MentorCard from '@/components/Card/MentorCard';
import Header from '@/components/Header';
import SearchWithLocation from '@/components/Search/SearchWithLocation';
import TabSelection from '@/components/Tabs/TabSelection';
import React from 'react';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import ProfileInfoCard from '@/components/Card/ProfileInfoCard';
import ConnectModal from '@/components/Modal/ConnectModal';

const ExploreContainer: React.FC = () => {

  const [searchValue, setSearchValue] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const tabs = ["For you", "Search", "Matching Activity"];
  const [mentor, setMentor] = React.useState([{
    name: "Mentor 1",
    location: "Location 1",
    description: "Make beautiful websites regardless of your design experience. Make beautiful website...",
    avatarUrl: AvatarPlaceholder,
    matchScore: 70,
    isFavorite: false,
  }, {
    name: "Mentor 2",
    location: "Location 2",
    description: "Make beautiful websites regardless of your design experience. Make beautiful website...",
    avatarUrl: AvatarPlaceholder,
    matchScore: 100,
    isFavorite: false,
  }, {
    name: "Mentor 3",
    location: "Location 3",
    description: "Make beautiful websites regardless of your design experience. Make beautiful website...",
    avatarUrl: AvatarPlaceholder,
    matchScore: 50,
    isFavorite: false,
  }, {
    name: "Mentor 4",
    location: "Location 4",
    description: "Make beautiful websites regardless of your design experience. Make beautiful website...",
    avatarUrl: AvatarPlaceholder,
    matchScore: 70,
    isFavorite: false,
  }]);

  const handleFavoriteClick = (index: number) => {
    const newMentor = [...mentor];
    newMentor[index].isFavorite = !newMentor[index].isFavorite;
    setMentor(newMentor);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
      <Header />
      <SearchWithLocation
        placeholder="Search for anything"
        className="w-3/5 max-w-4xl"
        value={searchValue}
        location={location}
        onChange={setSearchValue}
        onLocationChange={setLocation}
      />
      <TabSelection
        tabs={tabs}
        tabsTitle="Explore"
      />
      <div className='flex justify-between w-4/5 gap-4 p-4 '>
        <div className='flex flex-col gap-4 w-1/3'>
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
              />
            );
          })}
        </div>
        <ProfileInfoCard
          className="w-2/3 flex-grow"
          title="Do Chi Thanh"
          location="Hanoi, Vietnam"
          description="As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. 
                You will design detailed UI layouts, create benchmarks, and develop high-fidelity prototypes while documenting UX and UI strategies. Collaborating with technical teams, you will transform designs into impactful, industry-leading products. This role combines creativity and problem-solving to create meaningful user experiences. Your journey with us is an opportunity to drive innovation and make a significant impact."
          bio="Make beautiful websites regardless of your design experience. Make beautiful websites regardless of your design experience."
          rating={4.5}
          sdg="Profile SDG"
          onFavoriteClick={() => setIsFavorite(!isFavorite)}
          isFavorite={isFavorite}
          onClickButton={() => {
            setIsOpen(true)
          }}
        />
        <ConnectModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mentorName='Do Chi Thanh'
        />
      </div>
    </div>
  );
};

export default ExploreContainer;
