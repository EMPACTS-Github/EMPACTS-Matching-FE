import React from 'react';
import MemberListItem from './MemberListItem';

interface Member {
  email: string;
  title: string;
}

interface MemberListProps {
  members: Member[];
  onRemoveMember: (index: number) => void;
  className?: string;
}

function MemberList({ members, onRemoveMember, className = "" }: MemberListProps) {
  if (members.length === 0) return null;

  return (
    <div className={`flex flex-row flex-wrap gap-4 mt-4 ${className}`}>
      {members.map((member, index) => (
        <MemberListItem
          key={index}
          member={member}
          onRemove={() => onRemoveMember(index)}
        />
      ))}
    </div>
  );
}

export default MemberList;
