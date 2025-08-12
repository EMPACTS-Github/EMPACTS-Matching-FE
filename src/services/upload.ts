import {
  ATTACHMENTS_TYPE_IMAGE,
  ATTACHMENTS_TYPE_VIDEO,
  ATTACHMENTS_TYPE_DOCUMENT,
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
