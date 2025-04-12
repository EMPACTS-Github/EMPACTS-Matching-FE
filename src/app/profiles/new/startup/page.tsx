"use client";
import React, { useState } from 'react';
import HeaderSection from '@/components/CreateStartup/HeaderSection';
import ProfilePictureUpload from '@/components/CreateStartup/ProfilePictureUpload';
import StartupNameSection from '@/components/CreateStartup/StartupNameSection';
import LocationBasedSection from '@/components/CreateStartup/LocationBasedSection';
import SDGGoalSection from '@/components/CreateStartup/SDGGoalSection';
import AddMemberSection from '@/components/CreateStartup/AddMemberSection';
import ActionButtons from '@/components/CreateStartup/ActionButtons';
import { create_startup_profile, invite_list_member } from '@/apis/startup';
import ProtectedRoute from '@/app/ProtectedRoute';
import { Member } from '@/interfaces/startup';
import { addToast } from '@heroui/react';
import * as changeCase from "change-case";
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';
import { PROVINCES } from '@/constants/provinces';
import { useRouter } from 'next/navigation';

const CreateStartupProfile: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [startupUsername, setStartupUsername] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(STARTUP_SDG_GOALS.NO_POVERTY.textValue);
  const [location, setLocation] = useState(PROVINCES[0].key);
  const [profilePicture, setProfilePicture] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCancelCreateProfile = () => {
    router.back();
  }

  const handleGoalChange = (newGoal: string) => {
    setSelectedGoal(newGoal);
  }

  const handleCreateProfile = async () => {
    setLoading(true);
    const requestBody = {
      name: companyName,
      location_based: location,
      category: selectedGoal,
      // imgUrl: profilePicture,
    };

    try {
      const response = await create_startup_profile(requestBody);
      addToast({
        title: 'Profile created successfully',
        color: 'success',
        timeout: 3000,
      });
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : {};
      const inviterEmail = userObj.email;

      await invite_list_member({
        invitee: members,
        inviterEmail: inviterEmail,
        startupId: response.data.newStartup.id,
      });

      addToast({
        title: 'Members invited successfully',
        color: 'success',
        timeout: 3000,
      });
    } catch (error) {
      addToast({
        title: 'Error creating profile or inviting members',
        color: 'danger',
        timeout: 5000,
      });
      console.error('Error creating profile or inviting members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStartupUsername = (startupName: string) => {
    const username = changeCase.snakeCase(startupName);
    setStartupUsername('@' + username);
  }

  return (
    <ProtectedRoute>
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
            startupUsername={startupUsername}
            onCompanyNameChange={setCompanyName}
            onChangeStartupUsername={handleChangeStartupUsername}
          />
          <LocationBasedSection selectedLocation={location} onChange={setLocation} />
          <SDGGoalSection
            selectedGoal={selectedGoal}
            onGoalChange={handleGoalChange}
          />
          <AddMemberSection members={members} setMembers={setMembers} /> {/* Pass members and setMembers as props */}
          <ActionButtons onCancel={handleCancelCreateProfile} onCreate={handleCreateProfile} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateStartupProfile;

