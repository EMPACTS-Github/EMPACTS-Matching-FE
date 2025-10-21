import {
  ATTACHMENTS_TYPE_IMAGE,
  ATTACHMENTS_TYPE_VIDEO,
  ATTACHMENTS_TYPE_DOCUMENT,
  SPECIAL_ATTACHMENT_TYPE,
  ATTACHMENTS_TYPE,
  ATTACHMENT_MAX_SIZE,
} from '@/constants/upload';

// Check if the file is an image
export const isImageFile = (fileType: string) => {
  return Object.values(ATTACHMENTS_TYPE_IMAGE).includes(fileType);
};

export const isVideoFile = (fileType: string) => {
  return Object.values(ATTACHMENTS_TYPE_VIDEO).includes(fileType);
};

export const isDocumentFile = (fileType: string) => {
  return Object.values(ATTACHMENTS_TYPE_DOCUMENT).includes(fileType);
};

export const normalizeAttachmentType = (fileType: string) => {
  return SPECIAL_ATTACHMENT_TYPE[fileType] || fileType;
};

export const isValidAttachmentType = (fileType: string) => {
  return Object.values(ATTACHMENTS_TYPE).includes(fileType);
};

export const isValidAttachmentSize = (fileSize: number) => {
  return fileSize <= ATTACHMENT_MAX_SIZE;
};
