import React from "react";

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="p-4 text-center mb-6">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
};

export default ProfileHeader;
