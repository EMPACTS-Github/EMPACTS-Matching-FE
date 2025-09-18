'use client';
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
} from "@heroui/react";
import CloseIcon from '@/components/Icons/CloseIcon';
import Input from '@/components/Input/Input';

interface MemberModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const membersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john.smith@example.com',
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  },
];

const MemberItem = ({
  name,
  email,
  onRemove,
}: {
  name: string;
  email: string;
  onRemove: () => void;
}) => {
  return (
    <div className='flex justify-between bg-primary-20 rounded-lg px-3 py-2'>
      <p className='text-primary text-base font-bold leading-6 max-w-[200px] text-wrap break-words'>{name}</p>
      <p className='text-base font-normal leading-6 max-w-[250px] text-wrap break-words'>{email}</p>
      <div className='cursor-pointer text-primary w-[24px] h-[24px]' onClick={onRemove}>
        {/* Hard code value, will be fixed later */}
        <CloseIcon stroke={'#9200FE'} />
      </div>
    </div>
  );
};

const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onOpenChange }) => {
  const [members, setMembers] = useState(membersData);
  const [email, setEmail] = useState('');

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  }

  const handleAddMember = () => {
    setMembers([...members, { id: members.length + 1, name: email, email }]);
    setEmail('');
  }

  return (
    <Modal
    size='2xl'
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    classNames={{
      body: 'px-8 py-10',
    }}
    >
      <ModalContent>
        <ModalBody>
          <div className='flex flex-col gap-10'>
            <div>
              <p className='text-[28px] font-bold leading-[48px]'>Meeting members</p>
              <p className='text-base font-normal leading-6'>See who are attending the meeting and make the changes</p>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                {members.map((member) => (
                  <MemberItem key={member.id} name={member.name} email={member.email} onRemove={() => handleRemoveMember(member.id)} />
                ))}
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-base font-bold leading-6'>Add member</p>
                <div className='flex items-center gap-2'>
                  <Input
                    preset='default-lg'
                    variant='text'
                    placeholder='Enter email'
                    value={email}
                    onChange={(value) => setEmail(value)}
                  />
                   <Button
                    variant='solid'
                    className='bg-black text-white'
                    size='lg'
                    radius='lg'
                    onPress={handleAddMember}
                  >
                    <p className='text-base font-bold leading-6'>Add</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MemberModal;
