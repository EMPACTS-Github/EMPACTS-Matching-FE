import React from 'react';
import { Input } from "@heroui/react";

interface MentorNameSectionProps {
  mentorName: string;
  mentorUsername: string;
  onMentorNameChange: (value: string) => void;
  onChangeMentorUsername: (value: string) => void;
}

const MentorNameSection: React.FC<MentorNameSectionProps> = ({
  mentorName,
  mentorUsername,
  onMentorNameChange,
  onChangeMentorUsername,
}) => {
  const handleChangeMentorName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMentorNameChange(e.target.value);
    onChangeMentorUsername(e.target.value);
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[14px] font-semibold text-[#09090b]">
        Mentor name
      </label>

      <Input
        type="text"
        value={mentorName}
        onChange={handleChangeMentorName}
        placeholder="Mentor name"
        classNames={{
          input: "text-[14px] font-normal",
          inputWrapper: "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3"
        }}
        fullWidth
      />

      <p className="text-[14px] font-normal text-[#71717a] leading-5">
        Your profile could be found with username <span className="text-empacts">{mentorUsername !== '' ? mentorUsername : '@mentor_name'}</span>. You can change it later in Settings
      </p>
    </div>
  );
};

export default MentorNameSection;

