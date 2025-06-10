export interface IUploadData {
  ownerType: string;
  ownerId?: string;
  file: File;
}

export interface IUpdateAttachmentData {
  id: string;
  ownerId?: string;
  ownerType: string;
  attachmentTitle?: string;
  isDeleted?: boolean;
}