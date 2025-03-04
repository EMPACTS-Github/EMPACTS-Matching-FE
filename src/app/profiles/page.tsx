import React from 'react';
import ProfileCard from '../../components/Profiles/ProfileCard';
import ProtectedRoute from '@/app/ProtectedRoute';

const ProfileList: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center w-full h-screen relative z-10">
        <ProfileCard />
      </div>
    </ProtectedRoute>
  );
};

export default ProfileList;

