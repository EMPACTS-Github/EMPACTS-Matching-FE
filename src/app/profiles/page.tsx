import React from 'react';
import ProfileCard from '../../components/Profiles/ProfileCard';

const ProfileList: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen relative z-10">
      <ProfileCard />
    </div>
  );
};

export default ProfileList;

