import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import { IDocument } from '@/interfaces/upload';
import Image from 'next/image';
import DeleteWarningIcon from '/public/assets/delete-warning-icon.svg';
import { getFileName } from '@/services/file';

interface DeleteDocumentModalProps {
  document: IDocument | null;
  isOpen: boolean;
  onOpenChange: () => void;
  onDeleteAttachment: (attachment: IDocument | null) => void;
}

const DeleteDocumentModal = ({ document, isOpen, onOpenChange, onDeleteAttachment }: DeleteDocumentModalProps) => {
  const fileIcons = {
    docx: DocsIcon,
    csv: SheetsIcon,
    pptx: SlidesIcon,
    xlsx: SheetsIcon,
    pdf: SlidesIcon,
  };

  // Get icon based on file type
  const getFileIcon = (fileType: string) => {
    return fileIcons[fileType as keyof typeof fileIcons];
  }
  return (
    <Modal
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      size='lg'
      className='z-[1000]'
      placement="center"
    >
      <ModalContent>
        {
          (onClose) => (
            <>
              <ModalHeader className="flex gap-4">
                <Image
                  src={DeleteWarningIcon}
                  alt="Delete Warning Icon"
                  width={48}
                  height={48}
                />
                <h2 className="text-2xl font-bold">Are you sure you want to delete this document?</h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-4">
                  <div>
                    <Image
                      alt={`${document?.type} icon`}
                      height={40}
                      src={getFileIcon(document?.type || '')}
                      width={40}
                    />
                  </div>
                  <div
                    className="grid justify-items-start text-left bg-transparent border-none p-0"
                  >
                    <div className="text-lg text-black font-bold">{getFileName(document?.attachmentTitle || '')}</div>
                    <div className="text-xs text-gray-500">{document?.type}</div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between gap-4 w-full">
                <Button
                  onPress={onClose}
                  className="font-semibold bg-white w-1/2"
                  radius="lg"
                  variant='bordered'
                  color='primary'
                >
                  Cancel
                </Button>
                <Button
                  onPress={(e) => {
                    onDeleteAttachment(document)
                    onClose()
                  }}
                  className="font-semibold w-1/2"
                  radius="lg"
                  color='primary'
                  variant='solid'
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

export default DeleteDocumentModal