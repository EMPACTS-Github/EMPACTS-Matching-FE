import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import Image from 'next/image';

interface Member {
  email: string;
  title: string;
}

interface AddMemberSectionProps {
  accentColor?: string;
}

const AddMemberSection: React.FC<AddMemberSectionProps> = ({
  accentColor = "#70a75c", 
}) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { email: 'abc@gmail.com', title: 'CEO' },
    { email: 'abc@gmail.com', title: 'CEO' },
    { email: 'abc@gmail.com', title: 'CEO' },
    { email: 'nguyenvana@gmail.com', title: 'Nguyễn Văn A' },
    { email: 'nguyenvana@gmail.com', title: 'Nguyễn Văn A' },
  ]);

  const handleAddMember = () => {
    if (email && title) {
      setMembers([...members, { email, title }]);
      setEmail('');
      setTitle('');
    }
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  return (
    <div className="flex flex-col w-full gap-4" style={{ color: accentColor }}>
      <div className="text-sm font-semibold text-[#09090b] mb-2">Add member</div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter E-mail"
          className="flex-1"
          classNames={{
            input: "text-sm font-normal",
            inputWrapper: "border-[#e4e4e7] bg-white rounded-lg h-10",
          }}
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="flex-1"
          classNames={{
            input: "text-sm font-normal",
            inputWrapper: "border-[#e4e4e7] bg-white rounded-lg h-10",
          }}
        />
        <Button
          onClick={handleAddMember}
          className="w-full md:w-[100px] h-[40px] bg-[#09090b] text-white rounded-lg text-base font-medium"
        >
          Add
        </Button>
      </div>

      <div className="flex flex-row flex-wrap gap-4 mt-4">
        {members.map((member, index) => (
          <div
            key={index}
            className={`flex flex-row gap-3 p-2.5 rounded items-center w-full md:w-auto ${
              'bg-[#9200fe1c]'
            }`}
          >
            <div className="flex flex-col gap-1">
              <div
                className={`text-sm font-medium ${
                  'text-empacts'
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
                src="https://dashboard.codeparrot.ai/api/assets/Z4oNlBgaGNOSvOZS"
                alt="remove"
                width={20}
                height={20}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMemberSection;
