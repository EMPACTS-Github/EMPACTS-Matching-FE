import React, { useEffect, useState } from 'react';
import { Input, Button } from "@heroui/react";
import Image from 'next/image';
import { MemberForInvite } from '@/interfaces/startup';
import CloseXIcon from '/public/assets/icons/close-x-icon.svg';

interface AddMemberSectionProps {
  accentColor?: string;
  members: MemberForInvite[];
  setMembers: React.Dispatch<React.SetStateAction<MemberForInvite[]>>;
}

const AddMemberSection: React.FC<AddMemberSectionProps> = ({
  members,
  setMembers,
}) => {
  const [newMemberInfo, setNewMemberInfo] = useState({
    email: '',
    title: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemberInfo({ ...newMemberInfo, email: e.target.value });
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemberInfo({ ...newMemberInfo, title: e.target.value });
  }

  const handleAddMember = () => {
    const { email, title } = newMemberInfo;
    if (email && title) {
      const userInfo = JSON.parse(localStorage.getItem('user') as string);
      // Check user already in a startup
      if (email === userInfo.email) {
        setError('This email is already in a startup');
        return;
      }

      // Check this user already invited
      const invitedEmails = members.map((member) => member.email);
      if (invitedEmails.includes(email)) {
        setError('This email is already invited!');
        return;
      }

      setMembers([...members, { email, title }]);
      setNewMemberInfo({ email: '', title: '' });
    }
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  useEffect(() => {
    setError(null);
  }, [newMemberInfo.email])

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="text-sm font-semibold text-[#09090b]">Add member</div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Input
          value={newMemberInfo.email}
          onChange={handleChangeEmail}
          placeholder="Enter E-mail"
          className="flex-1"
          variant='bordered'
          classNames={{
            input: "text-sm font-normal",
            inputWrapper: "h-10",
          }}
        />
        <Input
          value={newMemberInfo.title}
          onChange={handleChangeTitle}
          placeholder="Enter Title"
          className="flex-1"
          variant='bordered'
          classNames={{
            input: "text-sm font-normal",
            inputWrapper: "h-10",
          }}
        />
        <Button
          onPress={handleAddMember}
          className="w-full md:w-[100px] h-[40px] bg-[#09090b] text-white rounded-lg text-base font-medium"
        >
          Add
        </Button>
      </div>
      {
        error && (
          <div className="text-[#EA4335] text-xs">{error}</div>
        )
      }

      <div className="flex flex-row flex-wrap gap-4 mt-4">
        {members.map((member, index) => (
          <div
            key={index}
            className={`flex flex-row gap-3 p-2.5 rounded items-center w-full md:w-auto ${'bg-[#9200fe1c]'
              }`}
          >
            <div className="flex flex-col gap-1">
              <div
                className={`text-sm font-medium ${'text-empacts'
                  }`}
              >
                {member.title}
              </div>
              <div className="text-sm text-[#71717a]">{member.email}</div>
            </div>
            <button
              onClick={() => handleRemoveMember(index)}
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
        ))}
      </div>
    </div>
  );
};

export default AddMemberSection;
