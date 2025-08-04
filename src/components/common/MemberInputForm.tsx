import React, { useState, useEffect } from 'react';
import { Input } from "@heroui/react";
import AuthButton from '@/components/common/AuthButton';

interface MemberInputFormProps {
  onAddMember: (email: string, title: string) => boolean;
  className?: string;
}

function MemberInputForm({ onAddMember, className = "" }: MemberInputFormProps) {
  const [memberInfo, setMemberInfo] = useState({
    email: '',
    title: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberInfo({ ...memberInfo, email: e.target.value });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberInfo({ ...memberInfo, title: e.target.value });
  };

  const handleAddMember = () => {
    const { email, title } = memberInfo;
    if (!email || !title) {
      setError('Please fill in both email and title');
      return;
    }

    const success = onAddMember(email, title);
    if (success) {
      setMemberInfo({ email: '', title: '' });
      setError(null);
    } else {
      setError('Failed to add member. Please check the email.');
    }
  };

  useEffect(() => {
    setError(null);
  }, [memberInfo.email]);

  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <div className="text-sm font-semibold text-[#09090b]">Add member</div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Input
          value={memberInfo.email}
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
          value={memberInfo.title}
          onChange={handleChangeTitle}
          placeholder="Enter Title"
          className="flex-1"
          variant='bordered'
          classNames={{
            input: "text-sm font-normal",
            inputWrapper: "h-10",
          }}
        />
        <AuthButton
          onClick={handleAddMember}
          className="w-full md:w-[100px] h-[40px] bg-[#09090b] text-white rounded-lg text-base font-medium"
          size="sm"
        >
          Add
        </AuthButton>
      </div>
      {error && (
        <div className="text-[#EA4335] text-xs">{error}</div>
      )}
    </div>
  );
}

export default MemberInputForm;
