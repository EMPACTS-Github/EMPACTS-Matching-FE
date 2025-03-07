"use client";
import SearchWithLocation from '@/components/Search/SearchWithLocation';
import TabSelection from '@/components/Tabs/TabSelection';
import React from 'react';

const ExploreContainer: React.FC = () => {

  const [searchValue, setSearchValue] = React.useState('');
  const [location, setLocation] = React.useState('');
  const tabs = ["For you", "Search", "Matching Activity"];

  return (
    <div className="flex flex-col items-center w-full h-screen relative z-10">
        <SearchWithLocation
            placeholder="Search for anything"
            className="w-96"
            value={searchValue}
            location={location}
            onChange={setSearchValue}
            onLocationChange={setLocation}
        />
        <TabSelection
            tabs={tabs}
            tabKey="explore"
            tabsTitle="Explore"
        />
    </div>
  );
};

export default ExploreContainer;
