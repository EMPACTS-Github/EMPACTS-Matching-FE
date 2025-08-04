import React from 'react';
import Image from 'next/image';
import CloseXIcon from '/public/assets/icons/close-x-icon.svg';

interface Member {
  email: string;
  title: string;
}

interface MemberListItemProps {
  member: Member;
  onRemove: () => void;
  className?: string;
}

function MemberListItem({ member, onRemove, className = "" }: MemberListItemProps) {
  return (
    <div
      className={`flex flex-row gap-3 p-2.5 rounded items-center w-full md:w-auto bg-[#9200fe1c] ${className}`}
    >
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-empacts">
          {member.title}
        </div>
        <div className="text-sm text-[#71717a]">{member.email}</div>
      </div>
      <button
        onClick={onRemove}
        className="w-5 h-5 flex items-center justify-center"
      >
        <Image
          src={CloseXIcon}
          alt="remove"
          width={8}
          height={8}
        />
      </button>
    </div>
  );
}

export default MemberListItem;
