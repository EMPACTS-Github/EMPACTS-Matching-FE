import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { IDocument } from '@/interfaces/upload';
import Image from 'next/image';
import DeleteWarningIcon from '/public/assets/delete-warning-icon.svg';

interface DeleteImageModalProps {
  image: IDocument | null;
  isOpen: boolean;
  onOpenChange: () => void;
  onDeleteAttachment: (attachment: IDocument | null) => void;
}

const DeleteImageModal = ({ image, isOpen, onOpenChange, onDeleteAttachment }: DeleteImageModalProps) => {
  return (
    <Modal
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        size='lg'
    >
      <ModalContent>
        {
          (onClose) => (
            <>
              <ModalHeader className="flex gap-2">
                <Image
                  src={DeleteWarningIcon}
                  alt="Delete Warning Icon"
                  width={48}
                  height={48}
                />
                <h2 className="text-2xl font-bold">Are you sure you want to delete this image?</h2>
              </ModalHeader>
              <ModalBody>
                <Image
                  src={image?.attachmentUrl || ''}
                  alt="Delete Image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </ModalBody>
              <ModalFooter className="flex justify-between gap-4">
                <Button
                  onPress={onClose}
                  className="border-[#9200FE] border-1 text-[#9200FE] font-bold bg-white w-full"
                  radius="lg"
                >
                  Cancel
                </Button>
                <Button
                  onPress={(e) => {
                    onDeleteAttachment(image)
                    onClose()
                  }}
                  className="bg-[#9200FE] text-white font-bold w-full"
                  radius="lg"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  )
}

export default DeleteImageModal