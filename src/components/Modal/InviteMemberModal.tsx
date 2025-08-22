import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  ModalBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from '@heroui/react';
import { MemberForInvite } from '@/interfaces/startup';
import Image from 'next/image';
import CloseXIcon from '/public/assets/icons/close-x-icon.svg';
import { Spinner } from '@heroui/spinner';
import InfoInCircleIcon from '@/components/Icons/InfoInCircleIcon';

interface InviteMemberModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onInvite: () => void;
  members: MemberForInvite[];
  setMembers: (members: MemberForInvite[]) => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onOpenChange,
  members,
  onInvite,
  setMembers,
}) => {
  const [newMemberInfo, setNewMemberInfo] = useState({
    email: '',
    title: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveButton = async () => {
    setIsLoading(true);
    await onInvite();
    setIsLoading(false);
    onOpenChange();
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemberInfo({ ...newMemberInfo, email: e.target.value });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemberInfo({ ...newMemberInfo, title: e.target.value });
  };

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
  }, [newMemberInfo.email]);

  return (
    <Modal isKeyboardDismissDisabled={true} size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="pt-1">
        {(onOpenChange) => (
          <>
            <ModalHeader className="items-center ">
              <div className="flex">
                <div>
                  <h3 className="text-lg text-secondary mb-1">Invite new member to your startup</h3>
                  <div className="font-normal text-neutral-50 text-sm">
                    Invite member into your interesting journey!
                  </div>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col w-full gap-2">
                <div className="text-sm font-semibold text-secondary">Add member</div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <Input
                    value={newMemberInfo.email}
                    onChange={handleChangeEmail}
                    placeholder="Enter E-mail"
                    className="flex-1"
                    variant="bordered"
                    classNames={{
                      input: 'text-sm font-normal',
                      inputWrapper: 'h-10',
                    }}
                  />
                  <Input
                    value={newMemberInfo.title}
                    onChange={handleChangeTitle}
                    placeholder="Enter Title"
                    className="flex-1"
                    variant="bordered"
                    classNames={{
                      input: 'text-sm font-normal',
                      inputWrapper: 'h-10',
                    }}
                  />
                  <Button
                    onPress={handleAddMember}
                    className="w-full md:w-[100px] h-[40px] bg-secondary text-neutral-20 rounded-lg text-base font-medium"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-row gap-1 items-center mt-2">
                  <InfoInCircleIcon />
                  <span className="text-xs font-light">
                    Please note that member is invited with member permission as default!
                  </span>
                </div>
                {error && <div className="text-error text-xs">{error}</div>}

                <div className="flex flex-row flex-wrap gap-4 mt-4">
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-3 p-2.5 rounded items-center w-full md:w-auto bg-primary-20"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">{member.title}</div>
                        <div className="text-sm text-neutral-80">{member.email}</div>
                      </div>
                      <button
                        onClick={() => handleRemoveMember(index)}
                        className="w-5 h-5 flex items-center justify-center"
                      >
                        <Image src={CloseXIcon} alt="remove" width={8} height={8} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                className="w-1/2 border-2"
                variant="light"
                onPress={onOpenChange}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-neutral-20 w-1/2"
                onPress={handleSaveButton}
                isDisabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default InviteMemberModal;
