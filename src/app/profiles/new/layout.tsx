'use client';
import Header from '@/components/Header';
import React from 'react';

const ProfilesNewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ProfilesNewLayout;
