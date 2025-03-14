"use client";

import React, { useEffect, useState } from 'react';
import MemberList from '@/components/StartupDetail/MemberList';
import { useParams } from 'next/navigation';
import { getStartupInfo } from '@/apis/startup'; // Updated import
import ProtectedRoute from '@/app/ProtectedRoute';

interface Member {
  id: number;
  name: string;
  role: string;
  isOwner: boolean;
  avt_url: string;
}

const MembersPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchStartupInfo = async () => {
      const response = await getStartupInfo(id);
      const membersData = response.data.members;
      const formattedMembers = membersData.map((member: any) => ({
        id: member.id,
        name: member.user_id.name,
        role: member.role,
        isOwner: member.role === 'OWNER',
        avt_url: member.user_id.avt_url,
      }));
      setMembers(formattedMembers);
    };

    fetchStartupInfo();
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Members</h1>
          <MemberList members={members} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MembersPage;