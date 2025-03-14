import React from 'react';
import Image from 'next/image';

interface Member {
  id: number;
  name: string;
  role: string;
  isOwner: boolean;
  avt_url: string;
}

interface MemberListProps {
  members: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return (
    <div className="flex flex-col space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Image src={member.avt_url} alt={member.name} width={40} height={40} className="rounded-full" />
            <div className="ml-4">
              <p className="font-bold text-gray-800">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
          {member.isOwner && <span className="text-purple-500">Owner</span>}
        </div>
      ))}
    </div>
  );
};

export default MemberList;