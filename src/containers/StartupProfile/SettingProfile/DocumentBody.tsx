import { Button, Card, CardBody, useDisclosure } from '@heroui/react';
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import DocumentEmptyStateLogo from '/public/assets/document-empty-state-logo.svg';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { getFileName, handleDocumentDownload } from '@/services/file';
import { IDocument } from '@/interfaces/upload';
import { PlusSquareIcon } from '@/components/Icons/PlusSquareIcon';
import { useRef } from 'react';
import MoreHorizontalIcon from '@/components/Icons/MoreHorizontalIcon';
import DeleteIcon from '@/components/Icons/DeleteIcon';
import DeleteDocumentModal from '@/components/Modal/DeleteDocumentModal';

interface DocumentBodyProps {
  files: IDocument[];
  selectedFile: IDocument | null;
  onSelectFile: (file: IDocument) => void;
  onDeleteAttachment: (attachment: IDocument | null) => void;
  onUploadNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentBody: React.FC<DocumentBodyProps> = ({
  files,
  selectedFile,
  onSelectFile,
  onDeleteAttachment,
  onUploadNewFile,
}) => {
  const fileIcons = {
    docx: DocsIcon,
    csv: SheetsIcon,
    pptx: SlidesIcon,
    xlsx: SheetsIcon,
    pdf: SlidesIcon,
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen,
    onOpen: onOpenDeleteDocumentModal,
    onOpenChange: onOpenChangeDeleteDocumentModal,
  } = useDisclosure();

  // Get icon based on file type
  const getFileIcon = (fileType: string) => {
    return fileIcons[fileType as keyof typeof fileIcons] || DocumentEmptyStateLogo;
  };

  const handleOpenUploadNewFile = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div className='space-y-4'>
        <Card className='flex gap-3 shadow-none m-0 p-0'>
          <CardBody className='m-0 p-1'>
            <div className='space-y-4'>
              {files.map((file, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <button
                      type='button'
                      onClick={() =>
                        handleDocumentDownload(file.attachmentUrl, file.attachmentTitle)
                      }
                      className='cursor-pointer bg-transparent border-none p-0 flex items-center'
                    >
                      <Image
                        alt={`${file.type} icon`}
                        height={40}
                        src={getFileIcon(file.type)}
                        width={40}
                        className='cursor-pointer'
                      />
                    </button>
                    <button
                      type='button'
                      onClick={() =>
                        handleDocumentDownload(file.attachmentUrl, file.attachmentTitle)
                      }
                      className='grid justify-items-start text-left cursor-pointer bg-transparent border-none p-0'
                    >
                      <div className='text-lg text-black font-bold'>
                        {getFileName(file.attachmentTitle)}
                      </div>
                      <div className='text-xs text-gray-500'>{file.type}</div>
                    </button>
                  </div>
                  <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        className='bg-transparent border-none p-0'
                        onPress={() => {
                          onSelectFile(file);
                        }}
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key='delete-document'
                        variant='light'
                        className='p-0 bg-transparent'
                      >
                        <Button
                          className='flex items-center gap-2 bg-transparent border-none p-0 w-full'
                          onPress={() => {
                            onSelectFile(file);
                            onOpenDeleteDocumentModal();
                          }}
                        >
                          <DeleteIcon className='w-4 h-4 text-red-500' />
                          <div className='text-sm text-red-500 font-bold'>Delete Document</div>
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <Button
        size='sm'
        className='rounded-lg bg-primary w-36 text-xs text-white'
        startContent={<PlusSquareIcon />}
        onPress={handleOpenUploadNewFile}
      >
        Add new file
        <input ref={inputRef} type='file' className='hidden' onChange={onUploadNewFile} />
      </Button>
      <DeleteDocumentModal
        document={selectedFile}
        isOpen={isOpen}
        onOpenChange={onOpenChangeDeleteDocumentModal}
        onDeleteAttachment={onDeleteAttachment}
      />
    </>
  );
};
export default DocumentBody;
