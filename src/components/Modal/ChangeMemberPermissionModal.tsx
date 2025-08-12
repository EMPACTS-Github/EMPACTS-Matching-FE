import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
} from '@heroui/react';
import { Member } from '@/interfaces/StartupProfile';
import { useState, useEffect } from 'react';
import { Spinner } from '@heroui/spinner';

interface ChangePermissionModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  member: Member;
  onSave: (memberId: string, newRole: string) => void;
}

const ChangePermissionModal: React.FC<ChangePermissionModalProps> = ({
  isOpen,
  onOpenChange,
  member,
  onSave,
}) => {
  const [newRole, setNewRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (member) {
      setNewRole(member.role);
    }
  }, [member]);
  const changeRole = async () => {
    setIsLoading(true);
    await onSave(member.id, newRole);
    setIsLoading(false);
    onOpenChange();
  };
  return (
    <Modal isKeyboardDismissDisabled={true} size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="pt-1">
        {(onOpenChange) => (
          <>
            <ModalHeader className="items-center pb-0">
              <div>
                <h3 className="text-lg text-black mb-1">
                  Choose new role for <span className="text-empacts">{member?.user.name}</span>
                </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <RadioGroup
                color="primary"
                label="Select new role"
                className="mb-1"
                value={newRole}
                onValueChange={setNewRole}
              >
                <Radio
                  value="OWNER"
                  className="ml-1"
                  description="Has full administrative access to the entire organization, including profile edit and matching request management."
                >
                  Owner
                </Radio>
                <Radio
                  value="MEMBER"
                  className="ml-1"
                  description="Edit profile permission. Matching request permission is not allowed."
                >
                  Member
                </Radio>
              </RadioGroup>
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
                className="bg-empacts text-white w-1/2"
                onPress={changeRole}
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

export default ChangePermissionModal;
