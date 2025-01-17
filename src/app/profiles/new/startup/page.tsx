"use client";

import React from 'react';
import HeaderSection from '../(components)/HeaderSection';
import ProfilePictureUpload from '../(components)/ProfilePictureUpload';
import StartupNameSection from '../(components)/StartupNameSection';
import LocationBasedSection from '../(components)/LocationBasedSection';
import SDGGoalSection from '../(components)/SDGGoalSection';
import AddMemberSection from '../(components)/AddMemberSection';
import ActionButtons from '../(components)/ActionButtons';

const CreateStartupProfile: React.FC = () => {
  const [companyName, setCompanyName] = React.useState('');
  const [selectedGoal, setSelectedGoal] = React.useState('');
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
        <HeaderSection />
        <ProfilePictureUpload />
        <StartupNameSection
          companyName={companyName}
          onCompanyNameChange={setCompanyName}
        />
        <LocationBasedSection />
        <SDGGoalSection
          selectedGoal={selectedGoal}
          onGoalChange={setSelectedGoal}
        />
        <AddMemberSection />
        <ActionButtons />
      </div>
    </div>
  );
};

export default CreateStartupProfile;

