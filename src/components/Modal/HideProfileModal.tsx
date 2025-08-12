import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalBody } from '@heroui/react';
import Image from 'next/image';
import DeleteWarningIcon from '/public/assets/delete-warning-icon.svg';

interface HideProfileModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onHideProfile: () => void;
  isHide: boolean | undefined;
}

const HideProfileModal = ({
  isOpen,
  onOpenChange,
  onHideProfile,
  isHide,
}: HideProfileModalProps) => {
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
              {isHide ? (
                <h2 className="text-2xl font-bold">
                  Are you sure you want to unhide your profile?
                </h2>
              ) : (
                <h2 className="text-2xl font-bold">Are you sure you want to hide your profile?</h2>
              )}
            </ModalHeader>
            <ModalBody>
              {isHide ? (
                <div className="font-normal text-gray-400 text-sm">
                  Unhide your profile from search results across entire platform.
                </div>
              ) : (
                <div className="font-normal text-gray-400 text-sm">
                  Hide your profile from search results across entire platform.
                </div>
              )}
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
                  onHideProfile();
                  onClose();
                }}
                className="font-bold w-1/2"
                radius="lg"
                color="primary"
                variant="solid"
              >
                {isHide ? 'Unhide' : 'Hide'}
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HideProfileModal;
