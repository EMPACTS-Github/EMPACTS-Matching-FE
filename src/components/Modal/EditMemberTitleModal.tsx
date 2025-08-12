import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { useState, useEffect } from 'react';
import LabelWithTextarea from '@/components/Input/LabelWithTextarea';
import { Member } from '@/interfaces/StartupProfile';
import { Spinner } from '@heroui/spinner';

interface EditMemberTitleModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  member: Member;
  onSave: (memberId: string, newTitle: string) => void;
}

const EditMemberTitleModal: React.FC<EditMemberTitleModalProps> = ({
  isOpen,
  onOpenChange,
  member,
  onSave,
}) => {
  const [titleField, setTitleField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const editTitle = async () => {
    setIsLoading(true);
    await onSave(member.id, titleField);
    setIsLoading(false);
    onOpenChange();
  };

  useEffect(() => {
    if (member) {
      setTitleField(member.positionTitle);
    }
  }, [member]);

  return (
    <Modal
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        body: 'h-6',
      }}
    >
      <ModalContent className="pt-1">
        {(onOpenChange) => (
          <>
            <ModalHeader className="items-center ">
              <div>
                <h3 className="text-lg text-black mb-1">
                  Edit position title for <span className="text-empacts">{member?.user.name}</span>
                </h3>
                <div className="font-normal text-gray-400 text-xs">
                  We take certain actions for the safety of our users
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <LabelWithTextarea
                label="New position title"
                content={titleField || ''}
                setContent={setTitleField}
                minRows={1}
                placeholder="Enter new title"
              />
            </ModalBody>
            <ModalFooter className="flex justify-between mt-20">
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
                onPress={editTitle}
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

export default EditMemberTitleModal;
