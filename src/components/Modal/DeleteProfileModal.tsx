import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalBody } from '@heroui/react';
import Image from 'next/image';
import DeleteWarningIcon from '/public/assets/delete-warning-icon.svg';

interface DeleteProfileModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onDeleteProfile: () => void;
}

const DeleteProfileModal = ({ isOpen, onOpenChange, onDeleteProfile }: DeleteProfileModalProps) => {
  return (
    <Modal
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex gap-4">
              <Image src={DeleteWarningIcon} alt="Delete Warning Icon" width={48} height={48} />
              <h2 className="text-2xl font-bold">Are you sure you want to delete your profile?</h2>
            </ModalHeader>
            <ModalBody>
              <div className="font-normal text-gray-400 text-sm">
                Once deleted, it will be gone forever. Please be certain
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between gap-4 w-full">
              <Button
                onPress={onClose}
                className="font-bold w-1/2"
                radius="lg"
                color="primary"
                variant="bordered"
              >
                Cancel
              </Button>
              <Button
                onPress={(e) => {
                  onDeleteProfile();
                  onClose();
                }}
                className="font-bold w-1/2"
                radius="lg"
                color="primary"
                variant="solid"
              >
                Delete
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteProfileModal;
