"use client";

import React from 'react';
import HeaderSection from '../(components)/HeaderSection';
import ProfilePictureUpload from '../(components)/ProfilePictureUpload';
import StartupNameSection from '../(components)/StartupNameSection';
import LocationBasedSection from '../(components)/LocationBasedSection';
import SDGGoalSection from '../(components)/SDGGoalSection';
import AddMemberSection from '../(components)/AddMemberSection';
import ActionButtons from '../(components)/ActionButtons';
import { create_startup_profile, invite_list_member } from '@/apis/startup'; // Import the API
interface Member {
  email: string;
  title: string;
}

const CreateStartupProfile: React.FC = () => {
  const [companyName, setCompanyName] = React.useState('');
  const [selectedGoal, setSelectedGoal] = React.useState('');
  const [location, setLocation] = React.useState('HA_NOI');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [members, setMembers] = React.useState<Member[]>([]); // Add state for members

  const handleCreateProfile = async () => {
    const requestBody = {
      name: companyName,
      location_based: location,
      category: selectedGoal,
      // imgUrl: profilePicture,
    };

    try {
      const response = await create_startup_profile(requestBody);
      console.log('Profile created successfully:', response);
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : {};
      const inviterEmail = userObj.email;

      const inviteResponse = await invite_list_member({
        invitee: members,
        inviterEmail: inviterEmail,
        startupId: response.data.newStartup.id,
      });

      console.log('Members invited successfully:', inviteResponse);
    } catch (error) {
      console.error('Error creating profile or inviting members:', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
        <HeaderSection />
        <ProfilePictureUpload onImageUpload={(file) => setProfilePicture(file)} />
        <StartupNameSection
          companyName={companyName}
          onCompanyNameChange={setCompanyName}
        />
        <LocationBasedSection selectedLocation={location} onChange={setLocation} />
        <SDGGoalSection
          selectedGoal={selectedGoal}
          onGoalChange={setSelectedGoal}
        />
        <AddMemberSection members={members} setMembers={setMembers} /> {/* Pass members and setMembers as props */}
        <ActionButtons onCreate={handleCreateProfile} />
      </div>
    </div>
  );
};

export default CreateStartupProfile;

