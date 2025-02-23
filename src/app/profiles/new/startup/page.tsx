"use client";

import React, { useState } from 'react';
import HeaderSection from '../(components)/HeaderSection';
import ProfilePictureUpload from '../(components)/ProfilePictureUpload';
import StartupNameSection from '../(components)/StartupNameSection';
import LocationBasedSection from '../(components)/LocationBasedSection';
import SDGGoalSection from '../(components)/SDGGoalSection';
import AddMemberSection from '../(components)/AddMemberSection';
import ActionButtons from '../(components)/ActionButtons';
import { create_startup_profile, invite_list_member } from '@/apis/startup'; // Import the API
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

interface Member {
  email: string;
  title: string;
}

const CreateStartupProfile: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [location, setLocation] = useState('HA_NOI');
  const [profilePicture, setProfilePicture] = useState('');
  const [members, setMembers] = useState<Member[]>([]); // Add state for members
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCreateProfile = async () => {
    setLoading(true); // Set loading to true
    const requestBody = {
      name: companyName,
      location_based: location,
      category: selectedGoal,
      // imgUrl: profilePicture,
    };

    try {
      const response = await create_startup_profile(requestBody);
      toast.success('Profile created successfully');
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : {};
      const inviterEmail = userObj.email;

      const inviteResponse = await invite_list_member({
        invitee: members,
        inviterEmail: inviterEmail,
        startupId: response.data.newStartup.id,
      });

      toast.success('Members invited successfully');
    } catch (error) {
      toast.error('Error creating profile or inviting members');
      console.error('Error creating profile or inviting members:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
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

